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
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    if (!code) {
      setError('No code provided');
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
      }
    };

    getUser();
  }, [params, router]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Verifying...</p>;
  return <p>User verified successfully!</p>;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyPageContent />
    </Suspense>
  );
}
