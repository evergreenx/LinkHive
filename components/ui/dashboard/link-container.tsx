import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import EmptyState from './empty-state';
import { ColorRing } from 'react-loader-spinner';

type linksType = Database['public']['Tables']['links']['Row'];

const LinkContainer = ({ links }: { links: linksType[] }) => {
  const [dummyLinks, setDummyLinks] = useState<linksType[]>(links);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isLoadingToogle, setIsLoadingToggle] = useState<boolean>(false);

  const handleToggle = async (idx: number, currentIsPublic: boolean) => {
    setIsLoadingToggle(true); // Set loading state to true before the operation

    const newIsPublic = currentIsPublic !== null ? !currentIsPublic : false;

    try {
      await supabase.from('links').update({ is_public: newIsPublic }).eq('id', idx).select();

      router.refresh();
    } catch (error) {
      alert('Error toggling link');
      // Handle error state or display an error message to the user
    } finally {
      setIsLoadingToggle(false); // Set loading state to false after the operation completes
    }
  };

  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const handleDeleteLinks = async (idx: number) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.from('links').delete().eq('id', idx);

      if (error) {
        throw new Error(error.message);
      }

      router.refresh();
    } catch (error) {
      alert('Error deleting link');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="my-10">
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
      <Reorder.Group as="ul" axis="y" values={dummyLinks} onReorder={setDummyLinks}>
        {links?.map((link) => (
          <Reorder.Item
            className="bg-white py-5 px-5 w-full  lg:w-[640px] rounded-[14px] mt-10"
            key={link.id}
            value={link}
          >
            <div className="flex justify-between items-center">
              <p className="truncate">{link.title} </p>

              <div className=" flex">
                {isLoadingToogle && (
                  <ColorRing
                    visible={true}
                    height="20"
                    width="20"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#000', '#000', '#000', '#000', '#000']}
                  />
                )}
                <Switch
                  checked={link?.is_public}
                  disabled={isLoadingToogle}
                  onCheckedChange={() => handleToggle(link.id, link.is_public)}
                />
              </div>
            </div>

            <p className="truncate">{link.url}</p>

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

      {links?.length === 0 && <EmptyState />}
    </div>
  );
};

export default LinkContainer;
