'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, CheckCircle, Clock, XCircle, Mail } from 'lucide-react';
import { userStartups } from '@/lib/call-api/call-api';
import { Startup, User } from '@/types';
import Loading from '@/app/loading';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-3 w-3" />;
    case 'rejected':
      return <XCircle className="h-3 w-3" />;
    case 'pending':
      return <Clock className="h-3 w-3" />;
    default:
      return null;
  }
};

export default function StartupProfile() {
  const [activeTab, setActiveTab] = useState('all');
  const [startups, setStartups] = useState<Startup[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: 'startup',
  });

  useEffect(() => {
    try {
      const getUserfetchStartups = async () => {
        // get user info
        const session = await authClient.getSession();

        const user = session.data?.user;

        setUser({
          id: user?.id || '',
          name: user?.name || '',
          email: user?.email || '',
          role: (user?.role as 'user' | 'admin' | 'startup') || 'startup',
        });

        // fetch startup
        const data = await userStartups();
        setStartups(data);
      };
      getUserfetchStartups();
    } catch (err) {
      console.error('Failed to load user startups:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // loading
  if (loading) {
    return <Loading />;
  }

  const filteredStartups = startups?.filter((startup) => {
    if (activeTab === 'all') return true;
    return startup.status === activeTab;
  });

  const counts = {
    all: startups?.length,
    approved: startups?.filter((s) => s.status === 'approved').length,
    pending: startups?.filter((s) => s.status === 'pending').length,
    rejected: startups?.filter((s) => s.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Compact Header */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-2xl font-bold">{startups?.length}</div>
                <div className="text-sm text-gray-600">Total Startups</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Compact Navigation */}
        <Card className="p-2">
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All Startups', count: counts.all },
              { key: 'approved', label: 'Approved', count: counts.approved },
              { key: 'pending', label: 'Pending', count: counts.pending },
              { key: 'rejected', label: 'Rejected', count: counts.rejected },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 text-xs"
              >
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>
        </Card>

        {/* Startup List */}
        <div className="space-y-3">
          {Array.isArray(filteredStartups) && filteredStartups?.length > 0 ? (
            filteredStartups.map((startup) => (
              <Card
                key={startup._id}
                className="p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <h3 className="font-medium">{startup.name}</h3>
                      </div>
                      <Badge
                        className={`text-xs ${getStatusColor(startup.status)}`}
                      >
                        {getStatusIcon(startup.status)}
                        <span className="ml-1 capitalize">
                          {startup.status}
                        </span>
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {startup.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {/* <span>{startup.category}</span> */}
                      <Separator orientation="vertical" className="h-3" />
                      <span>
                        Submitted{' '}
                        {new Date(startup.foundedYear).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4">
                    <Link href={`/startups/${startup._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs bg-transparent"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8">
              <div className="text-center text-gray-500">
                <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No startups found for this category</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
