import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import DB from './services/dynamodb';
import signUpRouter from './routes/signUp';
import confirmSignUpRouter from './routes/confirmSignUp';
import getAdminUserRouter from './routes/getAdminUser';
import listUsersRouter from './routes/listUsers';
import loginRouter from './routes/login';
import updateSessionRouter from './routes/updateSession';
import logoutRouter from './routes/logout';

const App: Application = express();

// middlewares
App.use(cors({
  origin: process.env.origin,
  credentials: true
}));
App.use(express.json());
App.use(cookieParser());

// routes
App.use('/signUp', signUpRouter);
App.use('/confirmSignUp', confirmSignUpRouter);
App.use('/getAdminUser', getAdminUserRouter);
App.use('/listUsers', listUsersRouter);
App.use('/login', loginRouter);
App.use('/updateSession', updateSessionRouter);
App.use('/logout', logoutRouter);

// DynamoDB
App.post('/getDataFromDB', async (req: Request, res: Response) => {
  const ID = req.body.id;
  const data = await DB.get(ID).catch(err => err);

  res.send(data);
});

App.get('/test', (req: Request, res: Response) => {
  res.send('Test response');
});

export default App;