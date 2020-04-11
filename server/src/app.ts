import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import requestLogger from './middlewares/requestLogger';

const App: Application = express();

// middlewares
App.use(cors());
App.use(bodyParser.json());
App.use(requestLogger);

App.get('/', (req: Request, res: Response) => {
  res.send('Full-stack App Starter');
});

export default App;