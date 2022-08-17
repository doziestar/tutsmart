import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { verifyidentityNumberDto, ExternalInfoDto } from '@dtos/users.dto';
import { BVNInterface, NINInterface, PassportInterface, VotersCardInterface, DriversLicenseInterface } from '@/interfaces/id.interface';
import { isEmpty } from '@utils/util';
import axios from '@utils/axios';

type DBkeys = keyof typeof DB;
type IDtype = verifyidentityNumberDto | ExternalInfoDto;

class IDService {
  public async search(data: IDtype, id: DBkeys) {
    try {
      let result: object;
      const idData = await this.getFromDB(data, id);
      if (!idData) {
        if (data instanceof ExternalInfoDto) {
          const extData =
            id === 'DriversLicense'
              ? await this.searchDriversLicense(data)
              : id === 'BVN'
              ? await this.searchBVN(data.governmentId)
              : id === 'NIN'
              ? await this.searchNIN(data.governmentId)
              : id === 'Passport'
              ? await this.searchPassport(data)
              : await this.searchVotersCard(data.governmentId);
          result = await this.saveToDB(extData, id);
        } else {
          const user = await DB.Users.findOne({ where: { identityNumber: data.identityNumber } });
          if (!user) throw new HttpException(409, "You're not a valid user");

          const intData = {
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
            searchParameter:
              id === 'DriversLicense'
                ? user.driverLicense
                : id === 'BVN'
                ? user.bvn
                : id === 'NIN'
                ? user.nin
                : id === 'Passport'
                ? user.passport
                : user.vin,
          };
          result = await this.saveToDB(intData, id, user.id);
        }
      } else {
        result = idData;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async saveToDB(data: object, _model: DBkeys, userId?: string): Promise<Object> {
    try {
      const model: string = _model;
      let savedData: object;
      if (!userId) {
        savedData = await DB[model].create({ ...data, userId });
      } else {
        savedData = await DB[model].create(data);
      }
      return savedData;
    } catch (error) {
      throw error;
    }
  }

  private async getFromDB(data: IDtype, _model: DBkeys): Promise<Object | null> {
    // todo
    try {
      let model: string;
      let dbData: object | null;
      if (data instanceof verifyidentityNumberDto) {
        model = 'Users';
        dbData = await DB[model].findOne({
          where: {
            identityNumber: data.identityNumber,
          },
        });
      } else {
        model = _model;
        dbData = await DB[model].findOne({
          where: {
            searchParameter: data.governmentId,
          },
        });
      }
      return dbData;
    } catch (error) {
      throw error;
    }
  }

  private async searchBVN(bvn: string): Promise<Omit<BVNInterface, 'userId'>> {
    try {
      if (isEmpty(bvn)) throw new HttpException(400, 'Please enter a valid BVN');

      const bvnData = await axios.BVN(bvn);
      if (!bvnData) throw new HttpException(409, 'You passed a wrong BVN');
      return bvnData;
    } catch (error) {
      throw error;
    }
  }

  private async searchNIN(nin: string): Promise<Omit<NINInterface, 'userId'>> {
    try {
      if (isEmpty(nin)) throw new HttpException(400, 'Please enter a valid NIN');

      const ninData = await axios.NINValidationByNIN(nin);
      if (!ninData) throw new HttpException(409, 'You passed a wrong NIN');
      return ninData;
    } catch (error) {
      throw error;
    }
  }

  private async searchPassport(idData: ExternalInfoDto): Promise<Omit<PassportInterface, 'userId'>> {
    try {
      if (isEmpty(idData)) throw new HttpException(400, 'Please enter a valid Passport data');

      const passportData = await axios.InternationalPassport(idData);
      if (!passportData) throw new HttpException(409, 'You passed a wrong Passport Data');
      return passportData;
    } catch (error) {
      throw error;
    }
  }

  private async searchDriversLicense(idData: ExternalInfoDto): Promise<Omit<DriversLicenseInterface, 'userId'>> {
    try {
      if (isEmpty(idData)) throw new HttpException(400, 'Please enter a valid Drivers License');

      const driversLicenseData = await axios.DriversLicense(idData);
      if (!driversLicenseData) throw new HttpException(409, 'You passed a wrong Drivers License');
      return driversLicenseData;
    } catch (error) {
      throw error;
    }
  }

  private async searchVotersCard(vin: string): Promise<Omit<VotersCardInterface, 'userId'>> {
    try {
      if (isEmpty(vin)) throw new HttpException(400, 'Please enter a valid VIN');

      const vinData = await axios.VotersCard(vin);
      if (!vinData) throw new HttpException(409, 'You passed a wrong vin');
      return vinData;
    } catch (error) {
      throw error;
    }
  }

  private async searchBVN(bvn: string): Promise<IUser[]> {
    try {
      if (isEmpty(bvn)) throw new HttpException(400, 'Please enter a valid BVN');

      const bvnData = await axios.BVN(bvn);
      if (!bvnData) throw new HttpException(409, 'You passed a wrong BVN');
      return bvnData;
    } catch (error) {
      throw error;
    }
  }
}

export default IDService;
