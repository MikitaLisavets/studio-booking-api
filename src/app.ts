import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import DB from './services/dynamodb';
import signUpRouter from './routes/signUp';
import confirmSignUpRouter from './routes/confirmSignUp';
import getUserRouter from './routes/getUser';
import { cognitoProvider } from './services/cognito';

const App: Application = express();

// middlewares
App.use(cors());
App.use(express.json());

// routes
App.use('/signUp', signUpRouter);
App.use('/confirmSignUp', confirmSignUpRouter);
App.use('/getUser', getUserRouter);

App.post('/listUsers', (req: Request, res: Response) => {
  cognitoProvider.listUsers({
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID
  }, (error, data) =>  {
    if (error) return res.status(500).send({ error });
    res.send(data.Users);
  });
});

App.post('/getDataFromDB', async (req: Request, res: Response) => {
  const ID = req.body.id;
  const data = await DB.get(ID).catch(err => err);

  res.send(data);
});

App.get('/test', (req: Request, res: Response) => {
  res.send('Test response');
});

export default App;