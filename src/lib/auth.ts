import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { username } from 'better-auth/plugins';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

const client = new MongoClient(mongoUri);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [username()],
});
