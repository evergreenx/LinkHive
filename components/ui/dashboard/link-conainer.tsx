import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Reorder } from 'framer-motion';

export default function LinkContainer() {
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
  return (
    <div className="my-10">
      <Reorder.Group as="ul" axis="y" values={dummyLinks} onReorder={setDummyLinks}>
        {dummyLinks.map((link, index) => (
          <Reorder.Item
            className="bg-white py-5 px-5 w-full  lg:w-[640px] rounded-[14px] mt-10"
            key={index}
            value={link}
          >
            <div className="flex justify-between items-center">
              <p>{link.title} </p>

              <Switch checked={link.show} onCheckedChange={() => handleToggle(index)} />
            </div>

            <p>{link.url}</p>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
