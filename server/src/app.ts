import express, { Application, Request, Response } from 'express';

const App: Application = express();

App.get('/', (req: Request, res: Response) => {
  res.send('Full-stack App Starter');
});

export default App;