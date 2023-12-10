import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type linksType = Database['public']['Tables']['links']['Row'];

const LinkContainer = ({ links }: { links: linksType[] | null }) => {
  const [dummyLinks, setDummyLinks] = useState([
    { title: 'Example Link 1', url: 'https://example.com/link1', show: true },
    { title: 'Example Link 2', url: 'https://example.com/link2', show: false },
    { title: 'Example Link 3', url: 'https://example.com/link3', show: true }
    // Add more dummy links as needed with the 'show' property
  ]);

  const handleToggle = (index: number) => {
    // Create a new array to avoid mutating state directly
    const updatedLinks = [...dummyLinks];
    updatedLinks[index].show = !updatedLinks[index].show; // Toggle the 'show' property
    setDummyLinks(updatedLinks); // Update state with the modified links
  };

  const supabase = createClientComponentClient<Database>();

  const handleDeleteLinks = async (id: number) => {
    await supabase.from('links').delete().eq('id', id);
  };
  return (
    <div className="my-10">
      <Reorder.Group as="ul" axis="y" values={dummyLinks} onReorder={setDummyLinks}>
        {links?.map((link, index) => (
          <Reorder.Item
            className="bg-white py-5 px-5 w-full  lg:w-[640px] rounded-[14px] mt-10"
            key={link.id}
            value={link.title}
          >
            <div className="flex justify-between items-center">
              <p>{link.title} </p>

              {link.is_public ? (
                <Switch checked={link?.is_public} onCheckedChange={() => handleToggle(index)} />
              ) : null}
            </div>

            <p>{link.url}</p>

            <div className="delete mt-5 cursor-pointer" onClick={() => handleDeleteLinks(link.id)}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.33341 -0.000488281L6.97986 0.145958L5.64653 1.47929L5.50008 1.83284V3H1H0.5V4H1H2.50002L2.50008 15.4995L3.00008 15.9995H14.0001L14.5001 15.4995L14.5 4H16H16.5V3H16H11.5001V1.83284L11.3536 1.47929L10.0203 0.145958L9.66675 -0.000488281H7.33341ZM10.5001 3V2.03995L9.45964 0.999512H7.54052L6.50008 2.03995V3H10.5001ZM5.50008 4H3.50002L3.50008 14.9995H13.5001L13.5 4H11.5001H10.5001H6.50008H5.50008ZM7.5 7V7.5V11.5V12H6.5V11.5V7.5V7H7.5ZM10.5 7.5V7H9.5V7.5V11.5V12H10.5V11.5V7.5Z"
                  fill="#676B5F"
                />
              </svg>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default LinkContainer;
