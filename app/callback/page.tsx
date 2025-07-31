'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

    const getUser = async () => {
      try {
        const res = await fetch(`/api/callback?code=${code}`);
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
          router.push('/submit/startup-info');
        } else {
          setError(data.message || 'Failed to verify');
          router.replace('/submit/verify');
        }
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
