'use client';

import * as React from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useRouter } from 'next/navigation';

export default function Page() {
  const supabase = createClientComponentClient();

  const [userData, setUserData] = React.useState<Session | null>(null);

  React.useEffect(() => {
    const handleFetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setUserData(session);
    };

    handleFetchUser();
  }, [supabase.auth]);

  const router = useRouter();

  if (userData) {
    return router.push('/dashboard/links');
  } else {
    return router.push('/login');
  }

  return <></>;
}
