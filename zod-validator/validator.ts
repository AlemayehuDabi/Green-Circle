import { z } from 'zod';
// import { ObjectId } from 'mongodb';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'password should have at least 6 character'),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(3, 'name field should have at least 3 character'),
    email: z.email(),
    password: z.string().min(6, 'password should have at least 6 character'),
    confirmPassword: z
      .string()
      .min(6, 'password should have at least 6 character'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
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

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type StartUpInput = z.infer<typeof StartupZodSchema>;
