'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserProfileDropdown } from './user-profile-dropdown';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Loading from '@/app/loading';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage }: HeaderProps) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchSession = async () => {
        const { data } = await authClient.getSession();
        setSession(data?.user || null);
      };

      fetchSession();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <span className="text-sm font-bold text-white">ES</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Green Circle
            </span>
          </Link>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/startups"
              className={`${
                currentPage === 'startups'
                  ? 'font-medium text-emerald-600'
                  : 'text-gray-800 hover:text-gray-900'
              }`}
            >
              Directory
            </Link>
            <Link
              href={
                session
                  ? session.role === 'user'
                    ? '/submit/verify'
                    : session.role === 'startup'
                    ? '/submit/startup-info'
                    : '/login'
                  : '/login?callbackUrl=/submit/verify'
              }
              className={`${
                currentPage === 'submit'
                  ? 'font-medium text-emerald-600'
                  : 'text-gray-800 hover:text-gray-900'
              }`}
            >
              Submit Startup
            </Link>
            {session === undefined ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200" />
            ) : session ? (
              <>
                <UserProfileDropdown session={session} />
              </>
            ) : (
              // If no session, show Login and Get Started buttons
              <>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-gray-900"
                >
                  Login
                </Link>
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
