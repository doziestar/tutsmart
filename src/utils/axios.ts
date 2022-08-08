import axios, { AxiosError } from 'axios';
import { VERIFICATION_BASE_URL, API_KEY } from 'config';
import { VerificationRequest } from '@/interfaces/ng.interface';

class Axios {
  constructor() {
    axios.defaults.baseURL = VERIFICATION_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['ClientId'] = API_KEY;
  }

  async NINValidationByNIN(ninNumber: VerificationRequest['searchParameter']) {
    try {
      const { data } = await axios.post('/NINValidationByNIN', {
        searchParameter: ninNumber,
        verificationType: 'NIN-SEARCH',
      });
      return data;
    } catch (error) {
      this.HandleError(error);
    }
  }

  async VotersCard(reqData: VerificationRequest['searchParameter'], selfie: Partial<VerificationRequest['selfie']> = null) {
    try {
      let requestData;
      if (selfie) {
        requestData = {
          searchParameter: reqData,
          country: 'NG',
          verificationType: 'VIN-FACE-MATCH-VERIFICATION',
          selfie,
          selfieToDatabaseMatch: 'true',
        };
      } else {
        requestData = {
          searchParameter: reqData,
          country: 'NG',
          verificationType: 'VIN-FACE-MATCH-VERIFICATION',
          selfieToDatabaseMatch: 'false',
        };
      }
      const { data } = await axios.post('/VotersCard', requestData);
      return data;
    } catch (error) {
      this.HandleError(error);
    }
  }

  async InternationalPassport(reqData: Partial<VerificationRequest>) {
    try {
      const { data } = await axios.post('/InternationalPassport', {
        searchParameter: reqData.searchParameter,
        firstName: reqData.firstName,
        lastName: reqData.lastName,
        dob: reqData.dob,
        verificationType: 'PASSPORT-FULL-DETAILS',
      });
      return data;
    } catch (error) {
      this.HandleError(error);
    }
  }

  async DriversLicense(reqData: Partial<VerificationRequest>) {
    try {
      const { data } = await axios.post('/DriversLicense', {
        countryCode: 'NG',
        firstName: reqData.firstName,
        lastName: reqData.lastName,
        dob: reqData.dob,
        searchParameter: reqData.searchParameter,
        verificationType: 'DRIVER-LICENSE-FULL-DETAIL-VERIFICATION',
      });
      return data;
    } catch (error) {
      this.HandleError(error);
    }
  }

  async BVN(bvn: VerificationRequest['bvn']) {
    try {
      const { data } = await axios.post('/BVN', {
        channel_code: 'APISNG',
        bvn,
      });
      return data;
    } catch (error) {
      this.HandleError(error);
    }
  }

  private HandleError(error: any) {
    if (error instanceof AxiosError) {
      if (typeof error.response?.data === 'object') throw error.response?.data.message;
      else throw error.response?.data;
    } else throw error;
  }
}

export default new Axios();
