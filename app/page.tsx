"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from './lib/AuthContext';
import { user } from './types';
import { fetchUserInfo, signOut } from './auth';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<user>({ uid: '', username: '', email: '' });

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.uid).then(fetchedUserInfo => {
        if (fetchedUserInfo) {
          setUserInfo({
            uid: fetchedUserInfo.uid,
            username: fetchedUserInfo.username,
            email: fetchedUserInfo.email,
          });
        }
      });
    }
  })

  return (
    <div className='flex justify-center items-center h-screen'>
      {
        user ?
          <div className='text-center'>
            <h1>Welcome back, {userInfo.username}!</h1>
            <button
              className='bg-red-500 py-4 px-2 rounded text-lg mt-4 text-white'
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
          :
          <div className='text-center'>
            <button
              className='bg-green-500 py-4 px-2 rounded text-lg text-white'
              onClick={() => router.push('/login')}
            >
              Sign In
            </button>
          </div>
      }
    </div>
  )
}