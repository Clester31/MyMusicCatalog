/* eslint-disable @next/next/no-img-element */
"use client"

import { fetchUserInfo } from "@/app/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { user } from "@/app/types";
import { signOut } from "@/app/auth";

export default function Navbar() {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState<user | null>(null);
    const [sideBar, setSideBar] = useState<boolean>(false);
    const router = useRouter();

    const [userId, setUserId] = useState<string>('nouser');

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            fetchUserInfo(user.uid).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                }
            });
        }
    }, [user])

    return (
        <div className="fixed w-screen flex justify-between items-center bg-gradient-to-b from-gray-300 to-gray-100 text-white px-4 py-2 text-main_3 text-md border-b-4 border-b-main_2 hover:border-b-main_1 transition 250 ease-in-out z-10">
            <div
                className="text-xl font-semibold text-main_1 cursor-pointer flex flex-start w-1/3"
                onClick={() => router.push('/')}
            >
                <img
                    src='mmc_logo.png'
                    alt='site logo'
                    className="w-16 h-16 hover:scale-110 transition 250 ease-in-out"
                    onClick={() => router.push('/')}
                />
            </div>
            <div className="flex flex-row gap-16 text-main_2 font-semibold text-2xl w-1/3 justify-center">
                <h1 onClick={() => router.push('/home')} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Explore</h1>
                <h1 onClick={() => router.push('/search')} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Music Seach</h1>
                <h1 onClick={() => router.push(`/catalog/${userId}`)} className="hover:text-main_1 transition 250 ease-in-out cursor-pointer">Catalog</h1>
            </div>
            <div className="w-1/3 flex justify-end">
                {
                    !user ?
                        <button
                            className="bg-main_1 px-4 py-1 rounded-2xl text-white hover:bg-main_2 transition 250 ease-in"
                            onClick={() => router.push('/login')}
                        >
                            Log In/sign up
                        </button>
                        :
                        <img
                            alt="profile picture"
                            src={userInfo?.profilePicture}
                            className="w-16 h-16 rounded-full cursor-pointer"
                            onClick={() => setSideBar(!sideBar)}
                        />
                }
            </div>
            {
                sideBar &&
                <div className="bg-gray-100 w-48 top-20 mt-21 fixed right-0 flex flex-col gap-4 p-4 text-black border-main_2 border-l-4 border-b-4 border-gray-300 hover:border-b-main_1 hover:border-l-main_1 transition 250 ease-in-out text-lg text-center">
                    <h1 className="cursor-pointer hover:font-semibold" onClick={() => router.push('/usersettings')}>User Settings</h1>
                    <h1 className="text-red-500 cursor-pointer hover:font-semibold" onClick={() => {
                        setSideBar(false);
                        signOut();
                        router.push('/');
                    }}>Log Out</h1>
                </div>
            }
        </div>
    )
}