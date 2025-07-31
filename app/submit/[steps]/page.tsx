'use client';

import React, { useEffect, useState } from 'react';
import SubmitStartupForm from '../submit-form';
import { useRouter } from 'next/navigation';
import { authClient, type Session } from '@/lib/auth-client';

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData, error } = await authClient.getSession();
      if (!error && sessionData) {
        setSession(sessionData);
      } else {
        router.replace('/login');
      }
      setLoading(false);
    };

    getSession();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (session) return <SubmitStartupForm />;
}
