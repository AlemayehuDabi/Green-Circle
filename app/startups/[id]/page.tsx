import React from 'react';
import StartupDetailPage from './startupById';
import Loading from '../../loading';

interface StartupPageProps {
  params: { id: string };
}

export default async function page({ params }: StartupPageProps) {
  const { id } = (await params) as { id: string };

  if (!id) {
    return <Loading />;
  }

  console.log('params id', id);

  return <StartupDetailPage id={id} />;
}
