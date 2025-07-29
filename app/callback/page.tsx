'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const params = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    if (!code) return setError('No code provided');

    const getUser = async () => {
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
      }
    };

    getUser();
  }, [params]);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Verifying...</p>;
}
