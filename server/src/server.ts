import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import serverless from 'serverless-http';

if (process.env.NODE_ENV === 'express') {
  const PORT = process.env.PORT;
  App.listen(process.env.PORT, () => console.log(`Server is running in http://localhost:${PORT}`));
}

module.exports.handler = serverless(App);
