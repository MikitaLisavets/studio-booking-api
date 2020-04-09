import App from './app';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

dotenv.config()

const PORT = process.env.PORT || 3001;

async function start(): Promise<void> {
  try {
    // await mongoose.connect(process.env.MONGODB_URI, {
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
