import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false,
      },
      isValidate: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
      faydaId: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },
  plugins: [nextCookies()],
});
