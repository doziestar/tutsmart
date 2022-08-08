export interface BVNResponse {
  bvn_number: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
}

export type NINResponse = Omit<BVNResponse, 'bvn_number'> & {
  nin_number: string;
};

export type DriverLicenseResponse = Omit<BVNResponse, 'bvn_number'> & {
  licenseNumber: string;
  licenseExpiryDate: string;
  licenseClass: string;
  licenseState: string;
  licenseCountry: string;
  licenseAuthority: string;
};

export type PassportResponse = Omit<BVNResponse, 'bvn_number'> & {
  passportNumber: string;
  passportExpiryDate: string;
  passportCountry: string;
  passportAuthority: string;
};

export interface TaxInformation {
  taxId: string;
  lastPaymentDate: string;
  lastPaymentAmount: string;
  nextPaymentDate: string;
  nextPaymentAmount: string;
}

export type TaxIdResponse = Omit<BVNResponse, 'bvn_number'> & TaxInformation;

export interface VerificationRequest {
  searchParameter: string;
  verificationType: 'NIN-SEARCH' | 'DRIVER-LICENSE-FULL-DETAIL-VERIFICATION' | 'PASSPORT-FULL-DETAILS' | 'VIN-FACE-MATCH-VERIFICATION';
  countryCode: 'NG';
  country: 'NG';
  firstName: string;
  lastName: string;
  dob: string;
  selfie: string;
  selfieToDatabaseMatch: boolean;
  channel_code: 'APISNG';
  bvn: string;
}
