import APIModel from '@/models/api.model';
import StoreTokenModel from '@/models/token.model';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '@config';
import UserModel from '@models/users.model';
import AddressModel from '@models/address.model';
import bvnModel from '@/models/bvn.model';
import driversLicenseModel from '@/models/driversLicense.model';
import ninModel from '@/models/nin.model';
import passportModel from '@/models/passport.model';
import vinModel from '@/models/vin.model';
import { logger } from '@utils/logger';
import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.info('DB_HOST: ' + DB_HOST);
    logger.info('DB_PORT: ' + DB_PORT);
    logger.info('DB_DATABASE: ' + DB_DATABASE);
    logger.info('DB_USER: ' + DB_USER);
    logger.error('Unable to connect to the database:', err);
  });

const DB = {
  Users: UserModel(sequelize),
  APIKeys: APIModel(sequelize),
  Tokens: StoreTokenModel(sequelize),
  Address: AddressModel(sequelize),
  BVN: bvnModel(sequelize),
  DriversLicense: driversLicenseModel(sequelize),
  NIN: ninModel(sequelize),
  Passport: passportModel(sequelize),
  VIN: vinModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
