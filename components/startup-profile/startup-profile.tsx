'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as Tabs from '@radix-ui/react-tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  Plus,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

// Mock data
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Serial entrepreneur with 10+ years of experience in fintech and SaaS. Passionate about building solutions that make a difference.',
  location: 'San Francisco, CA',
  avatar: '/placeholder.svg?height=100&width=100',
  joinedDate: 'January 2024',
};

const mockStartups = [
  {
    id: '1',
    name: 'FinanceFlow',
    description: 'AI-powered financial planning platform for small businesses',
    status: 'approved',
    category: 'Fintech',
    funding: '$250K',
    employees: 8,
    submittedDate: '2024-01-15',
    reviewDate: '2024-01-20',
    logo: '/placeholder.svg?height=60&width=60',
  },
  {
    id: '2',
    name: 'EcoTrack',
    description:
      'Carbon footprint tracking and reduction platform for enterprises',
    status: 'pending',
    category: 'Climate Tech',
    funding: '$150K',
    employees: 5,
    submittedDate: '2024-02-10',
    reviewDate: null,
    logo: '/placeholder.svg?height=60&width=60',
  },
  {
    id: '4',
    name: 'LearnAI',
    description: 'Personalized learning platform using machine learning',
    status: 'approved',
    category: 'EdTech',
    funding: '$300K',
    employees: 12,
    submittedDate: '2023-12-20',
    reviewDate: '2023-12-28',
    logo: '/placeholder.svg?height=60&width=60',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-4 w-4" />;
    case 'rejected':
      return <XCircle className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function StartupProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const approvedStartups = mockStartups.filter((s) => s.status === 'approved');
  const pendingStartups = mockStartups.filter((s) => s.status === 'pending');
  const rejectedStartups = mockStartups.filter((s) => s.status === 'rejected');

  const StartupCard = ({ startup }: { startup: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={startup.logo || '/placeholder.svg'}
                alt={startup.name}
              />
              <AvatarFallback>{startup.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{startup.name}</CardTitle>
              <CardDescription className="text-sm">
                {startup.category}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(startup.status)}>
            {getStatusIcon(startup.status)}
            <span className="ml-1 capitalize">{startup.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{startup.funding}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{startup.employees} employees</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          <div>
            Submitted: {new Date(startup.submittedDate).toLocaleDateString()}
          </div>
          {startup.reviewDate && (
            <div>
              Reviewed: {new Date(startup.reviewDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {startup.status === 'rejected' && startup.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-800">
              <strong>Rejection Reason:</strong> {startup.rejectionReason}
            </p>
          </div>
        )}

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {startup.status !== 'approved' && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Founder Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your startups and profile
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Submit New Startup
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{mockStartups.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Startups
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {approvedStartups.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{pendingStartups.length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">$700K</p>
                  <p className="text-sm text-muted-foreground">Total Funding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <Tabs.List className="grid w-full grid-cols-5">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview" className="space-y-6">
            {/* All Startups Preview */}
            <Card>
              <CardHeader>
                <CardTitle>All Startups</CardTitle>
                <CardDescription>
                  Quick overview of all your submitted startups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockStartups.slice(0, 3).map((startup) => (
                    <StartupCard key={startup.id} startup={startup} />
                  ))}
                </div>
                {mockStartups.length > 3 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline">View All Startups</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="approved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approved Startups</CardTitle>
                <CardDescription>
                  Startups that have been approved by the admin team
                </CardDescription>
              </CardHeader>
              <CardContent>
                {approvedStartups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {approvedStartups.map((startup) => (
                      <StartupCard key={startup.id} startup={startup} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No approved startups yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Review</CardTitle>
                <CardDescription>
                  Startups currently under review by the admin team
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingStartups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingStartups.map((startup) => (
                      <StartupCard key={startup.id} startup={startup} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No startups pending review
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
