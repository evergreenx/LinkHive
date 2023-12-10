'use client';
import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToggle } from '@uidotdev/usehooks';
import LinkContainer from './link-container';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useRouter } from 'next/navigation';
import { ColorRing } from 'react-loader-spinner';

type linksType = Database['public']['Tables']['links']['Row'];

export default function AddLinks({ links }: { links: linksType[] | null }) {
  const router = useRouter();
  const formSchema = z.object({
    link: z.string().trim().url({
      message: ''
    })
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: ''
    }
  });

  const [on, toggle] = useToggle(false);
  // 2. Define a submit handler.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('links').insert([
          {
            url: values.link,
            title: 'testing',
            is_public: true,
            user_id: user?.id
          }
        ]);

        // Refreshing
        router.refresh();
        // Resetting state to form
        toggle(false);
        form.reset();
      }
    } catch (error) {
      alert(error);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setIsLoading(false);
    }
  };

  const supabase = createClientComponentClient<Database>();

  return (
    <>
      {/* show form */}

      {isLoading && (
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#000', '#000', '#000', '#000', '#000']}
        />
      )}
      {on ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" bg-white   lg:w-[640px] w-full rounded-[24px] py-5 px-8 mt-5 "
          >
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="w-full  ">
                  <div className="flex justify-between">
                    <FormLabel className="text-base font-semibold mb-[10px]">Enter URL</FormLabel>

                    <div onClick={() => toggle(false)} className="close relative cursor-pointer">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1_14944)">
                          <path
                            d="M14.1283 3.1151L14.5 2.74339L13.7566 2L13.3849 2.3717L14.1283 3.1151ZM2.8717 12.885L2.5 13.2566L3.2434 14L3.61509 13.6284L2.8717 12.885ZM3.61509 2.3717L3.2434 2L2.5 2.74339L2.8717 3.1151L3.61509 2.3717ZM13.3849 13.6284L13.7566 14L14.5 13.2566L14.1283 12.885L13.3849 13.6284ZM13.3849 2.3717L2.8717 12.885L3.61509 13.6284L14.1283 3.1151L13.3849 2.3717ZM2.8717 3.1151L13.3849 13.6284L14.1283 12.885L3.61509 2.3717L2.8717 3.1151Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_14944">
                            <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  <div className="flex space-x-5">
                    <FormControl>
                      <Input
                        placeholder="URL"
                        {...field}
                        className="w-full rounded-lg  px-3 py-6 border-none outline-none focus:border-none bg-[#ececec] placeholder:text-md"
                      />
                    </FormControl>

                    <Button
                      className="bg-[#000] text-base rounded-[64px] w-[80px]  px-3 py-6 self-end  text-white font-semibold disabled:text-[#A8AAA2]  disabled:bg-[#E0E2D9]"
                      type="submit"
                    >
                      Add
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        //  {/* show link */}
        <Button
          onClick={() => toggle(true)}
          className="bg-[#000] w-full  lg:w-[640px] p-6   mx-auto  rounded-full text-white font-bold"
          type="submit"
        >
          Add link
        </Button>
      )}

      {/* links area */}

      {links && <LinkContainer links={links} />}
    </>
  );
}
