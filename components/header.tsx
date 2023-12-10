"use client";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation"
import { RxCaretLeft, RxCaretRight} from 'react-icons/rx';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { Button } from "./button";
import { useUser, useAuthModal } from "@/custom-hooks";

interface IHeaderProps {
    children: React.ReactNode,
    className?: string
}

export const Header:React.FC<IHeaderProps> = ({
    children,
    className
}) => {
  const router = useRouter();
  const modal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser()
  
  const handleLogout = async() => {
    // Reset any playing songs
    const { error } = await supabaseClient.auth.signOut()
    router.refresh();

    if (error) {
        toast.error(error.message)
    } else {
        toast.success("Logged out!");
    }
  }
  
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
        <div className="w-full mb-4 flex items-center justify-between">
            <div className="hidden md:flex gap-x-2 items-center">
                <button 
                    className='rounded-full bg-black flex justify-center items-center hover:opacity-75 transition'
                    onClick={() => router.back()}
                >
                    <RxCaretLeft size={35} className='text-white' />
                </button>
                <button 
                    className='rounded-full bg-black flex justify-center items-center hover:opacity-75 transition'
                    onClick={() => router.forward()}
                >
                    <RxCaretRight size={35} className='text-white' />
                </button>
            </div>
            <div className="flex md:hidden gap-x-2 items-center">
                <button className="rounded-full p-2 bg-white hover:opacity-75 transition">
                    <HiHome size={20} className="text-black" />
                </button>
                <button className="rounded-full p-2 bg-white hover:opacity-75 transition">
                    <BiSearch size={20} className="text-black" />
                </button>
            </div>
            <div className="flex items-center justify-between gap-x-4">
                {user ? (
                    <div className="flex items-center gap-x-4">
                        <Button onClick={handleLogout} className="bg-white px-6 py-2">
                            Logout
                        </Button>
                        <Button onClick={() => router.push('/account')} className="bg-white">
                            <FaUserAlt />
                        </Button>
                    </div>
                ) : 
                (
                    <>
                        <div>
                            <Button className='text-neutral-300 bg-transparent font-medium' onClick={modal.open}>Sign up</Button>
                        </div>
                        <div>
                            <Button className='bg-white px-6 py-2' onClick={modal.open}>Log in</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}
