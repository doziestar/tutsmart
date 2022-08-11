process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from '@/app';
import { Routes } from '@/interfaces/routes.interface';
import AuthRoute from '@routes/auth.route';
import EnairaRoute from '@routes/enaira.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import VerifyRoute from '@routes/verify.route';
import VirtualPaymentsRoute from '@routes/payment.route';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';

validateEnv();

const routes: Routes[] = [new IndexRoute(), new UsersRoute(), new AuthRoute(), new VerifyRoute(), new EnairaRoute(), new VirtualPaymentsRoute()];

const app = new App(routes);

app.listen();
