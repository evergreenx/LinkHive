'use client';

import PreviewLinks from '@/components/ui/dashboard/preview-links';
import { containerVariants } from '@/variant';
import { motion } from 'framer-motion';
import React from 'react';

import AddLinks from '@/components/ui/dashboard/add-links';

export default function Page() {
  return (
    <motion.div className=" flex flex-col h-screen  lg:px-[18px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full lg:w-[841px] py-[16px] "
      >
        <h1 className="text-[rgb(33,37,41)] text-sm font-semibold my-5">Links</h1>

        <AddLinks />

        {/* links */}
      </motion.div>

      <motion.div className="lg:fixed p-8 right-0 lg:border-l h-screen lg:w-[570px] lg:block hidden border-[#e0e2d9]">
        <PreviewLinks />
      </motion.div>
    </motion.div>
  );
}
