'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { dropVariant } from '@/variant';

const Nav = () => {
  const supabase = createClientComponentClient();

  const [userData, setUserData] = useState<User | null>(null);

  // generate username intials
  function generateInitials(fullName: string) {
    // Split the full name into an array of words
    const words = fullName.split(' ');

    // Initialize an empty string to store the initials
    let initials = '';

    // Iterate through the words and extract the first character of each word
    words.forEach((word) => {
      if (word.length > 0) {
        // Extract the first character of each word and convert it to uppercase
        initials += word[0].toUpperCase();
      }
    });

    return initials;
  }

  useEffect(() => {
    const handleFetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      setUserData(user);
    };

    handleFetchUser();
  }, [supabase.auth]);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropVariant}
      className="flex justify-between items-center border border-[#E0E2D9] rounded-full px-4 py-3 "
    >
      <ul className="flex space-x-5">
        <li className="text-[#000] cursor-pointer text-sm font-semibold">Links</li>

        <li className="text-[#676B5F] cursor-pointer  text-sm font-semibold">Settings</li>

        <li className="text-[#676B5F] cursor-pointer  text-sm font-semibold">Analytics</li>
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userData?.user_metadata.avatar_url} />
            <AvatarFallback>
              {userData?.user_metadata?.name && generateInitials(userData?.user_metadata?.name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action="/auth/sign-out" method="post">
              <button type="submit">Log out</button>
            </form>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.header>
  );
};

export default Nav;
