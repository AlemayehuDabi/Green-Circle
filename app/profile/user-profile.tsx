// 'use client';

// import { useEffect, useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Calendar,
//   Edit,
//   Mail,
//   MapPin,
//   MoreVertical,
//   Phone,
//   Settings,
//   Shield,
//   User,
//   LogOut,
//   Bell,
//   X,
//   Link,
// } from 'lucide-react';
// import { authClient } from '@/lib/auth-client';
// import Loading from '../loading';
// import { useRouter } from 'next/navigation';
// import { updatedUser } from '@/lib/call-api/call-api';

// const getRoleColor = (role: string) => {
//   switch (role) {
//     case 'admin':
//       return 'bg-red-100 text-red-800 border-red-200';
//     case 'moderator':
//       return 'bg-blue-100 text-blue-800 border-blue-200';
//     default:
//       return 'bg-green-100 text-green-800 border-green-200';
//   }
// };

// const getRoleIcon = (role: string) => {
//   switch (role) {
//     case 'admin':
//       return <Shield className="h-3 w-3" />;
//     case 'moderator':
//       return <Settings className="h-3 w-3" />;
//     default:
//       return <User className="h-3 w-3" />;
//   }
// };

// export default function UserProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     location: '',
//     phone: '+251996685119',
//     nationality: '',
//     joinedDate: '',
//     role: '',
//     bio: 'Hi I`m Selam Tesfaye, i am CEO & founder AfriTech... ',
//   });

//   const [formData, setFormData] = useState({
//     phone: user.phone,
//     bio: user.bio,
//   });

//   const router = useRouter();

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const getUser = async () => {
//     try {
//       const session = await authClient.getSession();

//       setUser({
//         name: session.data?.user.name || '',
//         email: session.data?.user.email || '',
//         location: session.data?.user.address || '',
//         phone: session.data?.user.phone_number || '',
//         nationality: session.data?.user.nationality || '',
//         joinedDate: session.data?.user.createdAt.toString() || '',
//         role: session.data?.user.role || '',
//         bio: session.data?.user.bio || '',
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // get user
//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user.phone || user.bio) {
//       setFormData({
//         phone: user.phone,
//         bio: user.bio,
//       });
//     }
//   }, [user]);

//   if (loading) {
//     return <Loading />;
//   }

//   const handleSignOut = async () => {
//     await authClient.signOut();
//     router.replace('/login');
//   };

//   return (
//     <main className="min-h-screen  p-6">
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-green-800">User Profile</h1>
//             <p className="text-gray-600">
//               Manage your profile and account settings
//             </p>
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <MoreVertical className="w-5 h-5" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem className="text-red-600">
//                 <Button variant="link" onClick={() => handleSignOut()}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Sign Out
//                 </Button>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Profile + Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Profile Card */}
//           <Card className="md:col-span-1 bg-white shadow-lg border-green-200">
//             <CardHeader className="flex flex-col items-center text-center space-y-4">
//               <Avatar className="h-24 w-24">
//                 <AvatarFallback>
//                   {user.name
//                     .split(' ')
//                     .map((n) => n[0])
//                     .join('')}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-xl">{user.name}</CardTitle>
//                 <CardDescription className="text-gray-500 text-sm">
//                   {user.email}
//                 </CardDescription>
//               </div>
//               <div className="flex gap-2 items-center text-gray-600 text-sm">
//                 <Calendar className="h-4 w-4" />
//                 <span>
//                   Joined{' '}
//                   {new Date(user.joinedDate).toLocaleDateString(undefined, {
//                     year: 'numeric',
//                     month: 'long',
//                   })}
//                 </span>
//               </div>
//               <Badge className={`${getRoleColor(user.role)} mt-2`}>
//                 {getRoleIcon(user.role)}
//                 <span className="ml-1 capitalize">{user.role}</span>
//               </Badge>
//             </CardHeader>
//           </Card>

//           {/* Profile Info */}
//           <Card className="md:col-span-2 bg-white border-green-200 shadow-md">
//             <CardHeader className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-lg">Profile Details</CardTitle>
//                 <CardDescription>
//                   Update your personal info and bio
//                 </CardDescription>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsEditing(!isEditing)}
//               >
//                 {isEditing ? (
//                   <X className="w-4 h-4 mr-1" />
//                 ) : (
//                   <Edit className="w-4 h-4 mr-1" />
//                 )}
//                 {isEditing ? 'Cancel' : 'Edit'}
//               </Button>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleChange('phone', e.target.value)}
//                     disabled={!isEditing}
//                     placeholder="+251-975-4..."
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="bio">Bio</Label>
//                 <Textarea
//                   id="bio"
//                   rows={4}
//                   value={formData.bio}
//                   onChange={(e) => handleChange('bio', e.target.value)}
//                   disabled={!isEditing}
//                   placeholder="Tell us something about yourself..."
//                 />
//               </div>

//               {isEditing && (
//                 <div className="flex justify-end gap-3 pt-2">
//                   <Button
//                     className="bg-green-600 hover:bg-green-700"
//                     onClick={async () => {
//                       try {
//                         const update = await updatedUser({
//                           phone: formData.phone,
//                           bio: formData.bio,
//                           email: user.email,
//                         });

//                         // Update local state
//                         setUser((prev) => ({
//                           ...prev,
//                           phone: update.phone_number,
//                           bio: update.bio,
//                         }));

//                         getUser();

//                         setIsEditing(false);
//                       } catch (err) {
//                         console.error('Failed to update user:', err);
//                       }
//                     }}
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setIsEditing(false);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Account Status */}
//         <Card className="border-green-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg">Account Activity</CardTitle>
//             <CardDescription>
//               Overview of your status and recent activity
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 text-center gap-6">
//               <div>
//                 <div className="text-2xl font-bold text-green-600">Active</div>
//                 <div className="text-sm text-gray-500">Status</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-blue-600">
//                   {new Date(user.joinedDate).toLocaleDateString()}
//                 </div>
//                 <div className="text-sm text-gray-500">Member Since</div>
//               </div>
//               {/* <div>
//                 <div className="text-2xl font-bold text-purple-600">
//                   {user.lastActive}
//                 </div>
//                 <div className="text-sm text-gray-500">Last Active</div>
//               </div> */}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/auth-client';
import { Edit, Mail, Phone, Globe, Twitter, Linkedin, Github, Calendar, MapPin, User, Shield, Settings, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { updatedUser } from '@/lib/call-api/call-api';

// Types
type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

type UserProfileProps = {
  initialUser?: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    role: string;
    avatar?: string;
    banner?: string;
    location?: string;
    joinedDate: string;
    socialLinks?: SocialLinks;
  };
};

export default function UserProfile({ initialUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    role: '',
    avatar: '/placeholder-avatar.jpg',
    banner: '/placeholder-banner.jpg',
    location: 'Addis Ababa, Ethiopia',
    joinedDate: new Date().toISOString(),
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      website: '',
    },
  });

  const [formData, setFormData] = useState({
    phone: '',
    bio: '',
    location: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      website: '',
    },
  });

  // Initialize with default values or props
  useEffect(() => {
    if (initialUser) {
      setUser(prev => ({
        ...prev,
        ...initialUser,
        socialLinks: {
          ...prev.socialLinks,
          ...(initialUser.socialLinks || {}),
        },
      }));
      setFormData({
        phone: initialUser.phone || '',
        bio: initialUser.bio || '',
        location: initialUser.location || '',
        socialLinks: {
          twitter: initialUser.socialLinks?.twitter || '',
          linkedin: initialUser.socialLinks?.linkedin || '',
          github: initialUser.socialLinks?.github || '',
          website: initialUser.socialLinks?.website || '',
        },
      });
    } else {
      // Fetch user data if not provided
      fetchUserData();
    }
  }, [initialUser]);

  const fetchUserData = async () => {
    try {
      const session = await authClient.getSession();
      if (session.data?.user) {
        const userData = session.data.user;

        setUser(prev => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone_number || '',
          bio: userData.bio || '',
          role: userData.role || 'user',
          avatar: userData.image || prev.avatar,
          joinedDate: userData.createdAt ? new Date(userData.createdAt).toISOString() : new Date().toISOString(),
        }));

        setFormData(prev => ({
          ...prev,
          phone: userData.phone_number || '',
          bio: userData.bio || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    
    setFormData(prev => {
      const parentValue = prev[parent as keyof typeof prev];
      
      // Ensure the parent value is an object before spreading
      if (parentValue && typeof parentValue === 'object' && !Array.isArray(parentValue)) {
        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: value,
          },
        };
      }
      return prev;
    });
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  const handleSave = async () => {
    try {
      // Update user data
      const updated = await updatedUser({
        email: user.email,
        phone: formData.phone,
        bio: formData.bio,
      });

      // Update local state
      setUser(prev => ({
        ...prev,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
        socialLinks: formData.socialLinks,
      }));

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implement file upload logic
    // This is a placeholder for the actual file upload implementation
    try {
      setIsUploading(true);
      // const avatarUrl = await uploadFile(file);
      // setUser(prev => ({ ...prev, avatar: avatarUrl }));
      toast.success('Profile picture updated');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Handle the file upload here
      console.log('Dropped file:', file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'moderator':
        return <Settings className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Banner */}
      <div 
        className="relative h-48 bg-linear-to-r from-green-500 to-emerald-600 w-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button
              variant="outline"
              className="bg-white/90 hover:bg-white text-gray-800"
              onClick={() => {
                // Handle banner upload
                console.log('Change banner');
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Avatar with Edit Overlay */}
            <div className="relative group">
              <div
                className={cn(
                  'w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden',
                  isEditing && 'cursor-pointer ring-2 ring-offset-2 ring-green-500'
                )}
                onClick={handleAvatarClick}
              >
                <Avatar className="w-full h-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl bg-linear-to-br from-green-500 to-emerald-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn('px-3 py-1 text-sm', getRoleColor(user.role))}>
                    {getRoleIcon(user.role)}
                    <span className="ml-1.5 capitalize">{user.role || 'user'}</span>
                  </Badge>
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-1.5"
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined{' '}
                    {new Date(user.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-1">
                {user.socialLinks?.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {user.socialLinks?.website && (
                  <a
                    href={user.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - About & Social Links */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">About</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="min-h-[120px]"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">
                    {user.bio || 'No bio provided.'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Update your contact details and social links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="user@gmail.com"
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="flex-1"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Social Links</Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-5 w-5 text-blue-400" />
                          <Input
                            name="socialLinks.twitter"
                            value={formData.socialLinks.twitter}
                            onChange={handleInputChange}
                            placeholder="Twitter profile URL"
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-5 w-5 text-blue-600" />
                          <Input
                            name="socialLinks.linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={handleInputChange}
                            placeholder="LinkedIn profile URL"
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Github className="h-5 w-5" />
                          <Input
                            name="socialLinks.github"
                            value={formData.socialLinks.github}
                            onChange={handleInputChange}
                            placeholder="GitHub profile URL"
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-green-600" />
                          <Input
                            name="socialLinks.website"
                            value={formData.socialLinks.website}
                            onChange={handleInputChange}
                            placeholder="Personal website URL"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-600">1.2k</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-purple-600">356</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // Handle change password
                    console.log('Change password');
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={async () => {
                    await authClient.signOut();
                    router.push('/login');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Save Changes Button (only shown in edit mode) */}
            {isEditing && (
              <div className="sticky bottom-6 space-y-3">
                <Button
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}