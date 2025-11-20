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
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data?.user || null);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) return <Loading />;

  return (
    <header className="border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
            <span className="text-green-500">Green</span> Circle
          </span>

          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/startups"
              className={`transition-colors ${
                currentPage === 'startups'
                  ? 'text-emerald-600 font-medium'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Directory
            </Link>

            <Link
              href={
                session
                  ? session.role === 'startup'
                    ? '/submit/startup-info'
                    : '/submit/verify'
                  : '/login?callbackUrl=/submit/verify'
              }
              className={`transition-colors ${
                currentPage === 'submit'
                  ? 'text-emerald-600 font-medium'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Submit Startup
            </Link>

            {/* Right Side Session Section */}
            {session ? (
              <UserProfileDropdown session={session} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
