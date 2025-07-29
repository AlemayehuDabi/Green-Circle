// import React from 'react';
// import VerifyPage from './verify';

// export default function page() {
//   return <VerifyPage />;
// }
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const params = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const code = params.get('code');
    if (!code) return setError('No code provided');

    const getUser = async () => {
      try {
        const res = await fetch(`/api/callback?code=${code}`);
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
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

  return (
    <div>
      <h1>verifying</h1>
    </div>
  );
}
