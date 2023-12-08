'use client';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Messages from '../login/messages';

import GHLogo from '@/app/assets/gh.svg';
import GoogleIcon from '@/app/assets/google.svg';

const containerVariants = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3, // Delay before starting the animation of children
      staggerChildren: 0.2, // Delay between each child animation
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const inputVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function Login() {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [userData, setUserData] = useState<Session | null>(null);

  useEffect(() => {
    const handleFetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setUserData(session);
    };

    handleFetchUser();
  }, [supabase.auth]);

  const handleSign = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',

      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });
  };

  if (userData?.user) {
    return router.push('/');
  }

  return (
    <div className="flex w-full h-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="loginbg-sm flex flex-col w-full  justify-center gap-2"
      >
        <motion.form
          className=" flex flex-col justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
          initial={{ opacity: 0 }} // Initial state (hidden)
          animate={{ opacity: 1 }} // Animation when it becomes visible
        >
          <motion.h1 className="text-2xl font-bold mt-[20px]">Login</motion.h1>
          <p className="text-base  text-gray-500 py-[10px]">Welcome back!</p>
          <motion.button
            variants={inputVariants}
            className="border rounded-full font-semibold lg:w-[400px] border-[#ddd] px-6 py-3 text-black mb-2 flex justify-center items-center space-x-3"
            onClick={() => {
              handleSign();
            }}
          >
            <Image src={GHLogo} className="mr-2" width={18} alt="ghlogo" />
            Continue with Github
          </motion.button>

          <motion.button
            variants={inputVariants}
            className="border rounded-full font-semibold lg:w-[400px] border-[#ddd] px-6 py-3 text-black mb-2 flex justify-center items-center space-x-3"
            onClick={() => {
              handleSign();
            }}
          >
            <Image src={GoogleIcon} className="mr-2" width={18} alt="googleicon" />
            Continue with Google
          </motion.button>

          <Messages />

          <p className="  text-sm">
            Dont have an account ?{' '}
            <a className="text-blue-500" href="/signup">
              Sign up
            </a>
          </p>
        </motion.form>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="loginbg hidden lg:block w-full h-full"
      ></motion.div>
    </div>
  );
}
