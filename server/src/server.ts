import App from './app';
import config from 'config';
// import mongoose from 'mongoose';

const PORT = config.get('port') || 3000;

async function start(): Promise<void> {
  try {
    // await mongoose.connect(config.get('mongoUri'), {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true
    // });
    App.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}

start();
