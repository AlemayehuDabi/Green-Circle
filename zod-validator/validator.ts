import { z } from 'zod';
// import { ObjectId } from 'mongodb';

export const UserZodSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  role: z.enum(['startup', 'investor', 'admin']),
  faydaId: z.string().length(16).optional(),
});

// // optional helper if you want to validate MongoDB ObjectId
// const objectId = z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), {
//   message: 'Invalid ObjectId format',
// });

export const StartupZodSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  region: z.string().min(2),
  documents: z.array(z.url()).min(1),
  founders: z.array(z.string()).min(1), // array of User IDs (Fayda users)
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
});

export type UserInput = z.infer<typeof UserZodSchema>;
