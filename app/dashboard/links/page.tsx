import PreviewLinks from '@/components/ui/dashboard/preview-links';
import { containerVariants } from '@/variant';
import React from 'react';

import AddLinks from '@/components/ui/dashboard/add-links';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { MotionDiv } from '@/app/framer';
import { Database } from '@/lib/database.types';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const { data: links } = await supabase.from('links').select('*');

  if (!session) {
    redirect('/login');
  }

  return (
    <MotionDiv className=" flex flex-col h-screen  lg:px-[18px]">
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full lg:w-[841px] py-[16px] "
      >
        <h1 className="text-[rgb(33,37,41)] text-sm font-semibold my-5">Links</h1>

        <AddLinks links={links} />

        {/* links */}
      </MotionDiv>

      <MotionDiv className="lg:fixed p-8 right-0 lg:border-l h-screen lg:w-[570px] lg:block hidden border-[#e0e2d9]">
        <PreviewLinks />
      </MotionDiv>
    </MotionDiv>
  );
}
