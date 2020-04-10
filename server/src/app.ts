import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const App: Application = express();

// middlewares
App.use(cors());
App.use(bodyParser.json());

App.get('/', (req: Request, res: Response) => {
  res.send('Full-stack App Starter');
});

export default App;