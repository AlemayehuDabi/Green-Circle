'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Session } from '@/lib/auth-client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfileDropdownProps {
  session: Session;
}

export function UserProfileDropdown({ session }: UserProfileDropdownProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login'); // Redirect to login page after logout
  };

  // Get user initials for fallback avatar
  const userInitials = session.user?.email
    ? session.user.email.charAt(0).toUpperCase()
    : 'U'; // Default to 'U' if email is not available

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 cursor-pointer">
          {/* You can replace this with an actual user image if available */}
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt="User Avatar"
          />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none truncate">
              {session.user?.email || 'User'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
