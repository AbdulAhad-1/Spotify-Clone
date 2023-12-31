"use client";
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Button } from "./button";

interface IHeaderProps {
    children: React.ReactNode,
    className?: string
}

export const Header:React.FC<IHeaderProps> = ({
    children,
    className
}) => {
  const router = useRouter();
  const handleLogout = () => {}
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
                <>
                    <div>
                        <Button className='text-neutral-300 bg-transparent font-medium'>Sign up</Button>
                    </div>
                    <div>
                        <Button className='bg-white px-6 py-2'>Log in</Button>
                    </div>
                </>
            </div>
        </div>
        {children}
    </div>
  )
}
