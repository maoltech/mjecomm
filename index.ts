import express from 'express';
import dotenv from 'dotenv';
import {APPPORT} from './constants/environments';
import { routes } from './router/index.router';
import { databaseConfig } from './config/database.config';
import cors from 'cors';

dotenv.config();

const app = express();
const port = APPPORT || 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  }),
);

app.use(cors());

app.use('/api/v1', routes.router);

const applisten = app.listen(port);
if(applisten){
  console.log(`Server is running at http://localhost:${port}`);
};
databaseConfig.mongodbConnection();
