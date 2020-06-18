import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import serverless from 'serverless-http';

module.exports.handler = serverless(App);
