'use client';
import React, { useEffect, useState } from 'react';
import SubmitStartupForm from '../submit-form';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function page() {
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
  const router = useRouter();

  if (!session) {
    return router.replace('/login');
  }

  return <SubmitStartupForm />;
}
