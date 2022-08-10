import { NINInterface } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class NationalId extends Model implements NINInterface {
  public userId: string;
  public responseCode: string;
  public description: string;
  public verificationType: string;
  public verificationStatus: string;
  public transactionStatus: string;
  public transactionReference: string;
  public transactionDate: string;
  public searchParameter: string;
  public callBackUrl?: string;
  public livenessScore: number;
  public paymentRef?: string;
  public response: [
    {
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
    },
  ];
  faceMatch?: string;
}

export default function (sequelize: Sequelize): typeof NationalId {
  NationalId.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      responseCode: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      verificationType: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      verificationStatus: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionStatus: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionReference: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionDate: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      searchParameter: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      callBackUrl: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      livenessScore: number,
      paymentRef: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      response: [
        {
          batchid: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          birthcountry: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          birthdate: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          birthlga: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          birthstate: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          cardstatus: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          centralID: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          documentno: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          educationallevel: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          email: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          emplymentstatus: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          firstname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          gender: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          heigth: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          maidenname: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          maritalstatus: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          middlename: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nin: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_address1: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_address2: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_firstname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_lga: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_middlename: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_postalcode: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_state: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_surname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nok_town: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          nspokenlang: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          ospokenlang: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          othername: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          pfirstname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          photo: {
            allowNull: false,
            type: DataTypes.STRING(45), // todo
          },
          pmiddlename: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          profession: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          psurname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          religion: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          residence_AdressLine1: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          residence_AdressLine2: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          residence_Town: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          residence_lga: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          residence_postalcode: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          residence_state: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          residencestatus: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          self_origin_lga: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          self_origin_place: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          self_origin_state: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          signature: {
            allowNull: false,
            type: DataTypes.STRING(45), // todo
          },
          surname: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          telephoneno: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          title: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          trackingId: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
        },
      ],
      faceMatch: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
    },
    {
      sequelize,
      tableName: 'national_ids',
      timestamps: true,
      paranoid: true,
    },
  );
  return NationalId;
}
