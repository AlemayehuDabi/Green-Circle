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
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
=======
  const [user, setUser] = useState<User | null>(null);
>>>>>>> bbf5d25f2b17a85344da35d60882a33f993f167e
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    if (!code) return setError('No code provided');

    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/callback?code=${code}`);
        const data = await res.json();

        if (data.success) {
          router.push('/submit/startup-info');
        } else {
          router.replace('/submit/verify');
          setError(data.message || 'Failed to verify');
        }
      } catch (e) {
        console.error(e);
        setError('Server error');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [params]);

  if (error) return <p>Error: {error}</p>;
<<<<<<< HEAD
  if (!isLoading) return <p>Verifying...</p>;
=======
  if (!user) return <p>Verifying...</p>;
  return <p>User verified successfully!</p>;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyPageContent />
    </Suspense>
  );
>>>>>>> bbf5d25f2b17a85344da35d60882a33f993f167e
}
