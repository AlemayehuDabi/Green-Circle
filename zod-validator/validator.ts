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

export const faydaSchema = z.object({
  faydaId: z.literal(true), // must be checked
});

export const StartupZodSchema = z.object({
  startupName: z.string().min(1, 'Startup name is required'),
  sector: z.string().min(1, 'Sector is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  founderName: z.string().min(1, 'Founder name is required'),
  founderRole: z.string().min(1, 'Founder role is required'),
  pitch: z.string().min(1, 'Pitch is required'),
  startupLaw: z.literal(true, { message: 'You must agree to startup law.' }),
  faydaId: z.literal(true, { message: 'Fayda ID must be verified.' }),
  terms: z.literal(true, { message: 'You must accept the terms.' }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type StartUpInput = z.infer<typeof StartupZodSchema>;
