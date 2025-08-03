'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface User {
  name: string;
  email: string;
  role: 'startup' | 'user';
  isValidate: boolean;
  faydaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

function VerifyPageContent() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    if (!code) {
      setError('No code provided');
      setIsLoading(false);
      return;
    }

    const getVerifier = () => {
      return sessionStorage.getItem('code_verifier');
    };

    const codeVerifier = getVerifier();

    const getUser = async () => {
      const session = await authClient.getSession();
      const email = session.data?.user.email.toString();

      try {
        fetch('/api/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, codeVerifier, email }),
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.removeItem('code_verifier');
            // handle success
            console.log('User info:', data);
            sessionStorage.setItem('step_valid', 'true');
            localStorage.setItem('user', data.user);
            router.push('/submit/startup-info');
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (e) {
        console.error(e);
        setError('Server error');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [params, router]);

  if (isLoading) return <p>Verifying...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return null;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyPageContent />
    </Suspense>
  );
}
