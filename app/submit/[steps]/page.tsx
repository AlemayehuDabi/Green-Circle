'use client';

import React, { useEffect, useState } from 'react';
import SubmitStartupForm from '../submit-form';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Loading from '@/app/loading';

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
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

  useEffect(() => {
    const isVerified = sessionStorage.getItem('fayda_verified') === 'true';
    if (isVerified) {
      setVerified(true);
      sessionStorage.removeItem('fayda_verified');
    }
  }, []);

  if (loading) return <Loading />;
  if (session) return <SubmitStartupForm verified={verified} />;
}
