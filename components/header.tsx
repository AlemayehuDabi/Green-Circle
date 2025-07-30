'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage }: HeaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData, error } = await authClient.getSession();
      if (!error) {
        setSession(sessionData);
      }
    };

    getSession();
  }, []);
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
              <span className="text-sm font-bold text-white">ES</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Ethiopia Startup
            </span>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/startups"
              className={`${
                currentPage === 'startups'
                  ? 'font-medium text-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Directory
            </Link>
            <Link
              href={session ? '/submit/verify' : '/login'}
              className={`${
                currentPage === 'submit'
                  ? 'font-medium text-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Submit Startup
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
