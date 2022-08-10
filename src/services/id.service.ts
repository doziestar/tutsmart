import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { IUser } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import axios from '@utils/axios';

class IDService {
  public async findNIN(identityNumber: string): Promise<IUser[]> {
    try {
      if (isEmpty(identityNumber)) throw new HttpException(400, "You're not identityNumber");

      const user = await DB.Users.findOne({ where: { identityNumber } });
      if (!user) throw new HttpException(409, "You're not user");

      const nin = await DB.National_ids.findOne({ where: { userId: user.id } });
      let result;
      if (!nin) {
        result = await axios.NINValidationByNIN(user.nin);
        await DB.National_ids.create({ ...result, userId: user.id, signature: '', photo: '' });
      } else {
        result = nin;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findPassport(identityNumber: string): Promise<IUser[]> {
    try {
      if (isEmpty(identityNumber)) throw new HttpException(400, "You're not identityNumber");

      const user = await DB.Users.findOne({ where: { identityNumber } });
      if (!user) throw new HttpException(409, "You're not user");

      const passport = await DB.international_passports.findOne({ where: { userId: user.id } });
      let result;
      if (!passport) {
        result = await axios.InternationalPassport({
          searchParameter: user.passport,
          firstName: user.firstName,
          lastName: user.lastName,
          dob: user.dob,
        });
        await DB.international_passports.create({ ...result, userId: user.id, photo: '' });
      } else {
        result = passport;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findDriversLicense(identityNumber: string): Promise<IUser[]> {
    try {
      if (isEmpty(identityNumber)) throw new HttpException(400, "You're not identityNumber");

      const user = await DB.Users.findOne({ where: { identityNumber } });
      if (!user) throw new HttpException(409, "You're not user");

      const driversLicense = await DB.Drivers_licenses.findOne({ where: { userId: user.id } });
      let result;
      if (!driversLicense) {
        result = await axios.DriversLicense({ searchParameter: user.passport, firstName: user.firstName, lastName: user.lastName, dob: user.dob });
        await DB.Drivers_licenses.create({ ...result, userId: user.id, photo: '' });
      } else {
        result = driversLicense;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findBVN(identityNumber: string): Promise<IUser[]> {
    try {
      if (isEmpty(identityNumber)) throw new HttpException(400, "You're not identityNumber");

      const user = await DB.Users.findOne({ where: { identityNumber } });
      if (!user) throw new HttpException(409, "You're not user");

      const BVN = await DB.Bank_verifications.findOne({ where: { userId: user.id } });
      let result;
      if (!BVN) {
        result = await axios.BVN(user.bvn);
        await DB.Bank_verifications.create({ ...result, userId: user.id });
      } else {
        result = BVN;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async findVotersCard(identityNumber: string): Promise<IUser[]> {
    try {
      if (isEmpty(identityNumber)) throw new HttpException(400, "You're not identityNumber");

      const user = await DB.Users.findOne({ where: { identityNumber } });
      if (!user) throw new HttpException(409, "You're not user");

      const VIN = await DB.Voters_cards.findOne({ where: { userId: user.id } });
      await DB.Voters_cards.create({ userId: user.id });
      let result;
      if (!VIN) {
        result = await axios.VotersCard(user.vin);
      } else {
        result = VIN;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default IDService;
