'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInput, SignUpSchema } from '@/zod-validator/validator';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (SignUpData: SignUpInput) => {
    try {
      await authClient.signUp.email(
        {
          name: SignUpData.name,
          email: SignUpData.email,
          password: SignUpData.password,
          callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: () => {
            //show loading
            setIsLoading(true);
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            console.log(ctx.data);

            router.push('/');
          },
          onError: (ctx) => {
      
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <span className="text-sm font-bold text-white">ES</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Ethiopia Startup
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Account
            </CardTitle>
            <CardDescription>
              Join Ethiopia&apos;s startup ecosystem and discover verified
              opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Abebe"
                  {...register('name')}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abebe@example.com"
                  {...register('email')}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-gray-800">
                  I agree to the{' '}
                  <Link
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {isLoading ? 'Signing up...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-800">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
