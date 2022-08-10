import { DriversLicenseInterface } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class DriversLicense extends Model implements DriversLicenseInterface {
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
  public livenessScore: string;
  public paymentRef?: string;
  public response: {
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
  faceMatch?: string;
}

export default function (sequelize: Sequelize): typeof DriversLicense {
  DriversLicenseInterface.init(
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
      livenessScore: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      paymentRef: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      response: {
        gender: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        issuedDate: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        stateOfIssuance: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        first_name: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        last_name: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        middle_name: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        residence_state: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        first_state_of_issuance: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        residence_address_line1: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        residence_town: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        residence_lga: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        application_first_issued_date: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        dob: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        disability: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        facial_mark: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        glasses: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        height: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        self_origin_lga: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        mobile: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        maiden_name: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        birth_country: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        previous_dl_number: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        birth_state: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        license: {
          class: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          description: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
        },
        expiredDate: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        photo: {
          allowNull: false,
          type: DataTypes.STRING(45), // todo
        },
      },
      faceMatch: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
    },
    {
      sequelize,
      tableName: 'drivers_licenses',
      timestamps: true,
      paranoid: true,
    },
  );
  return DriversLicense;
}
