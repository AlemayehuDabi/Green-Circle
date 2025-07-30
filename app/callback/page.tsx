'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
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
  if (!isLoading) return <p>Verifying...</p>;
}
