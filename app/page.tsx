"use client";

import * as React from "react";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function DatePickerDemo() {
  const supabase = createClientComponentClient<any>();

  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const handleFetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserData(session);
    };

    handleFetchUser();
  }, []);

  const router = useRouter();

  if (userData) {
    return router.push("/dashboard");
  }
else {
  return router.push("/login");

}
  console.log(userData)
  return (
    <>
     
    </>
  );
}
