'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PreviewLinks from '@/components/ui/dashboard/preview-links';
import { containerVariants } from '@/variant';
import { motion } from 'framer-motion';
import React from 'react';
import { LinkValidation } from '@/lib/validation';
import { z } from 'zod';

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof LinkValidation>>({
    resolver: zodResolver(LinkValidation),
    defaultValues: {
      link: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LinkValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <motion.div className=" flex flex-col h-screen  px-[18px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" w-full py-[16px] mx-auto">
        <h1 className="text-[rgb(33,37,41)] text-sm font-semibold my-5">Links</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex bg-white w-full lg:w-[53%] rounded-[1rem] py-5 px-8 mt-5">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="URL"
                      {...field}
                      className="w-full lg:w-[200%] px-4 py-6 border-none outline-none focus:border-none bg-[#ececec] placeholder:text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-[#000] lg:w[55%] ml-[15rem] my-8 rounded-full py-5 px-5 text-white font-bold"
              type="submit">
              Add
            </Button>
          </form>
        </Form>
        <Button
          className="bg-[#000] w-full lg:w-[53%]  mx-auto my-8 rounded-full py-3 px-3 text-white font-bold"
          type="submit">
          Add link
        </Button>
      </motion.div>

      <motion.div className="lg:fixed p-8 right-0 lg:border-l h-full lg:w-[570px] border-[#e0e2d9]">
        <PreviewLinks />
      </motion.div>
    </motion.div>
  );
}
