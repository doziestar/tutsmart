import { faker } from '@faker-js/faker';

export type BVNResponse = {
  responseCode: 200 | 400;
  BVN: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  registrationDate: Date;
  enrollmentBank: string;
  enrollmentBranch: string;
  email: string;
  gender: string;
  levelOfAccount: string;
  lgaOfOrigin: string;
  lgaOfResidence: string;
  maritalStatus: string;
  NIN: string;
  nameOnCard: string;
  nationality: string;
  phoneNumber1: string;
  phoneNumber2: string;
  residentialAddress: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  watchListed: boolean;
};

export interface BVNInterface {
  userId?: string;
  response_code: 200 | 400;
  response_message: string;
  response_data: BVNResponse;
  searchParameter?: string;
}

export type DriversLicenseResponse = {
  gender: string;
  issuedDate: string;
  stateOfIssuance: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  residence_state?: string;
  first_state_of_issuance?: string;
  residence_address_line1?: string;
  residence_town?: string;
  residence_lga?: string;
  application_first_issued_date?: string;
  dob: string;
  disability?: string;
  facial_mark?: string;
  glasses?: string;
  height?: string;
  self_origin_lga?: string;
  mobile?: string;
  maiden_name?: string;
  birth_country?: string;
  previous_dl_number?: string;
  birth_state?: string;
  license: {
    class?: string;
    description?: string;
  };
  expiredDate: string;
  photo: string;
};

export interface DriversLicenseInterface {
  userId?: string;
  responseCode: string;
  description: string;
  verificationType: string;
  verificationStatus: string;
  transactionStatus: string;
  transactionReference: string;
  transactionDate: string;
  searchParameter: string;
  callBackUrl?: string;
  livenessScore: string;
  paymentRef?: string;
  response: DriversLicenseResponse;
  faceMatch?: string;
}

export type PassportResponse = {
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: string;
  mobile?: string;
  photo: string;
  gender: string;
  issued_at: string;
  issued_date: string;
  expiry_date: string;
  reference_id: string;
};

export interface PassportInterface {
  userId?: string;
  responseCode: string;
  description: string;
  verificationType: string;
  verificationStatus: string;
  transactionStatus: string;
  transactionReference: string;
  transactionDate: string;
  searchParameter: string;
  callBackUrl?: string;
  livenessScore: string;
  paymentRef?: string;
  response: PassportResponse;
  faceMatch?: string;
}

export type NINResponse = {
  batchid?: string;
  birthcountry: string;
  birthdate: string;
  birthlga: string;
  birthstate: string;
  cardstatus?: string;
  centralID: string;
  documentno?: string;
  educationallevel: string;
  email: string;
  emplymentstatus: string;
  firstname: string;
  gender: string;
  heigth: string;
  maidenname?: string;
  maritalstatus: string;
  middlename: string;
  nin: string;
  nok_address1: string;
  nok_address2: string;
  nok_firstname: string;
  nok_lga: string;
  nok_middlename: string;
  nok_postalcode: string;
  nok_state: string;
  nok_surname: string;
  nok_town: string;
  nspokenlang: string;
  ospokenlang: string;
  othername?: string;
  pfirstname: string;
  photo: string;
  pmiddlename: string;
  profession: string;
  psurname: string;
  religion: string;
  residence_AdressLine1: string;
  residence_AdressLine2?: string;
  residence_Town: string;
  residence_lga: string;
  residence_postalcode?: string;
  residence_state: string;
  residencestatus: string;
  self_origin_lga: string;
  self_origin_place: string;
  self_origin_state: string;
  signature: string;
  surname: string;
  telephoneno: string;
  title: string;
  trackingId: string;
};

export interface NINInterface {
  userId?: string;
  responseCode: string;
  description: string;
  verificationType: string;
  verificationStatus: string;
  transactionStatus: string;
  transactionReference: string;
  transactionDate: string;
  searchParameter: string;
  callBackUrl?: string;
  livenessScore: string;
  paymentRef?: string;
  response: NINResponse[];
  faceMatch?: string;
}

export interface IAddress {
  userId: string;
  address: string;
  isCurrentAddress: boolean;
}

export interface VotersCardInterface {
  userId?: string;
}

export const generateBVN = (): BVNInterface => ({
  userId: faker.random.alphaNumeric(10),
  response_code: 200,
  response_message: faker.random.words(6),
  response_data: fakeBVNResponse(),
});

// using faker to generate fake data for testing
export const fakeBVNResponse = (): BVNResponse => ({
  responseCode: 200,
  BVN: faker.random.numeric(9),
  firstName: faker.name.firstName(),
  middleName: faker.name.middleName(),
  lastName: faker.name.lastName(),
  dateOfBirth: faker.date.birthdate(),
  registrationDate: faker.date.past(),
  enrollmentBank: faker.company.name(),
  enrollmentBranch: faker.address.city(),
  email: faker.address.streetAddress(),
  gender: faker.name.gender(),
  levelOfAccount: faker.random.numeric(),
  lgaOfOrigin: faker.address.county(),
  lgaOfResidence: faker.address.county(),
  maritalStatus: faker.name.gender(),
  NIN: faker.random.numeric(9),
  nameOnCard: faker.name.fullName(),
  nationality: faker.address.country(),
  phoneNumber1: faker.phone.number(),
  residentialAddress: faker.address.streetAddress(),
  phoneNumber2: faker.phone.number(),
  stateOfOrigin: faker.address.state(),
  stateOfResidence: faker.address.state(),
  watchListed: true,
});

// console.log(generateBVN());
