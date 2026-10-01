import mongoose from 'mongoose';

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }
  return uri;
}

const MONGODB_URI = getMongoUri();

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
  return mongoose;
}
