'use client';

import React, { useEffect, useState } from 'react';
import SubmitStartupForm from '../submit-form';
import { useRouter } from 'next/navigation';
import { authClient, type Session } from '@/lib/auth-client';

export default function Page() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data, error }) => {
      if (!error) setSession(data);
      else setSession(null);
    });
  }, []);

  useEffect(() => {
    if (session === undefined) return;
    if (!session) router.replace('/login');
  }, [session, router]);

  if (session === undefined) return null;

  return <SubmitStartupForm />;
}
