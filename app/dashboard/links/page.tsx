import React from 'react';

export default function page() {
  return (
    <section className=" flex flex-col h-screen  p-[18px]">
      <div className=" w-full lg:w-[841px]">
        <h1 className="text-[rgb(33,37,41)] text-sm font-semibold">Links</h1>

        <div className="add__links">
          <button className="bg-[#000] w-full lg:w-[80%]  mx-auto my-8 rounded-full p-4 text-white font-bold">
            Add link
          </button>
        </div>
      </div>

      <div className="lg:absolute right-0 lg:border-l h-full w-[570px] border-[#e0e2d9]">
        <div className="p-2 fixed ">phone preview goes here</div>
      </div>
    </section>
  );
}
