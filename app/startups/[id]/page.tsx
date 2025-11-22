import React from 'react';
import StartupDetailPage from './startupById';
import Loading from '../../loading';

interface StartupPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: StartupPageProps) {
  const { id } = await params;

  if (!id) {
    return <Loading />;
  }

  console.log('params id', id);

  return <StartupDetailPage id={id} />;
}
