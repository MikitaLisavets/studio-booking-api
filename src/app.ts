import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import DB from './db';
import cognitoProvider from './cognito';

const App: Application = express();

// middlewares
App.use(cors());
App.use(bodyParser.json());


App.post('/confirmSignUp', (req: Request, res: Response) => {
  const params = {
    ClientId: process.env.AWS_APP_CLIENT_ID,
    ConfirmationCode: req.body.confirmationCode,
    Username: req.body.email
  };

  cognitoProvider.confirmSignUp(params, function(err, data) {
    if (err) return res.send('error ' + err);
    res.send(data);
  });
});

App.post('/signUp', (req: Request, res: Response) => {
  const params ={
    ClientId: process.env.AWS_APP_CLIENT_ID,
    Password: req.body.password,
    Username: req.body.email,
    UserAttributes: [
      { Name: 'email', Value: req.body.email }
    ],
    ValidationData: [
      { Name: 'email', Value: req.body.email },
    ]
  };

  cognitoProvider.signUp(params, (err, data) => {
    if (err) return res.send('error ' + err);
    res.send(data);
  });
});

App.post('/getUser', (req: Request, res: Response) => {
  const params = {
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    Username: req.body.email
  };

  cognitoProvider.adminGetUser(params, (err, data) => {
    if (err) return res.send('error ' + err);
    res.send(data);
  });
});

App.post('/listUsers', (req: Request, res: Response) => {
  cognitoProvider.listUsers({
    UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID
  }, (err, data) =>  {
    if (err) return res.send('error ' + err);
    res.send(data.Users);
  });
});

App.post('/getDataFromDB', async (req: Request, res: Response) => {
  const ID = req.body.id;
  const data = await DB.get(ID).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });

  res.send(data);
});

App.get('/test', (req: Request, res: Response) => {
  res.send('Test response');
});

export default App;