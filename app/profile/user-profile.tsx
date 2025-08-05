'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Calendar,
  Edit,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Settings,
  Shield,
  User,
  LogOut,
  Bell,
  X,
  Link,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import { updatedUser } from '@/lib/call-api/call-api';

const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
  avatar: '/placeholder.svg',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  bio: 'Software developer passionate about creating innovative solutions. Love working with modern technologies and building user-friendly applications.',
  joinedDate: '2023-03-01',
  lastActive: '2 hours ago',
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'moderator':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-green-100 text-green-800 border-green-200';
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'admin':
      return <Shield className="h-3 w-3" />;
    case 'moderator':
      return <Settings className="h-3 w-3" />;
    default:
      return <User className="h-3 w-3" />;
  }
};

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    nationality: '',
    joinedDate: '',
    role: '',
    bio: '',
  });

  const [formData, setFormData] = useState({
    phone: user.phone,
    bio: user.bio,
  });

  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getUser = async () => {
    try {
      const session = await authClient.getSession();

      setUser({
        name: session.data?.user.name || '',
        email: session.data?.user.email || '',
        location: session.data?.user.address || '',
        phone: session.data?.user.phone_number || '',
        nationality: session.data?.user.nationality || '',
        joinedDate: session.data?.user.createdAt.toString() || '',
        role: session.data?.user.role || '',
        bio: session.data?.user.bio || '',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // get user
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user.phone || user.bio) {
      setFormData({
        phone: user.phone,
        bio: user.bio,
      });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace('/login');
  };

  return (
    <main className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-800">User Profile</h1>
            <p className="text-gray-600">
              Manage your profile and account settings
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">
                <Button variant="link" onClick={() => handleSignOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile + Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1 bg-white shadow-lg border-green-200">
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="text-gray-500 text-sm">
                  {user.email}
                </CardDescription>
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined{' '}
                  {new Date(user.joinedDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <Badge className={`${getRoleColor(user.role)} mt-2`}>
                {getRoleIcon(user.role)}
                <span className="ml-1 capitalize">{user.role}</span>
              </Badge>
            </CardHeader>
          </Card>

          {/* Profile Info */}
          <Card className="md:col-span-2 bg-white border-green-200 shadow-md">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Profile Details</CardTitle>
                <CardDescription>
                  Update your personal info and bio
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <X className="w-4 h-4 mr-1" />
                ) : (
                  <Edit className="w-4 h-4 mr-1" />
                )}
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    placeholder="+251-975-4..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us something about yourself..."
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={async () => {
                      try {
                        const update = await updatedUser({
                          phone: formData.phone,
                          bio: formData.bio,
                          email: user.email,
                        });

                        // Update local state
                        setUser((prev) => ({
                          ...prev,
                          phone: update.phone_number,
                          bio: update.bio,
                        }));

                        getUser();

                        setIsEditing(false);
                      } catch (err) {
                        console.error('Failed to update user:', err);
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Status */}
        <Card className="border-green-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Account Activity</CardTitle>
            <CardDescription>
              Overview of your status and recent activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 text-center gap-6">
              <div>
                <div className="text-2xl font-bold text-green-600">Active</div>
                <div className="text-sm text-gray-500">Status</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {new Date(user.joinedDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">Member Since</div>
              </div>
              {/* <div>
                <div className="text-2xl font-bold text-purple-600">
                  {user.lastActive}
                </div>
                <div className="text-sm text-gray-500">Last Active</div>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
