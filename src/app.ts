import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/requestLogger';
import DB from './db';

const App: Application = express();

// middlewares
App.use(cors());
App.use(bodyParser.json());
App.use(requestLogger);

App.get('/', (req: Request, res: Response) => {
  res.send('Full-stack App Starter');
});

App.get('/addUser', (req: Request, res: Response) => {
  res.send('Api');
});

App.get('/getUsers', async (req: Request, res: Response) => {
  const ID = '1';
  const user = await DB
    .get(ID)
    .catch(err => {
      console.log('error in Dynamo Get', err);
      return null;
    });

  res.send(user);
});

export default App;