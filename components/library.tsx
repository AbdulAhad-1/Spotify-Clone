"use client";

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

export const Library = () => {

  const handleClick = () => {}
  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist className='text-neutral-400' size={26} />
                <p className='font-medium text-neutral-400 text-base'>Your Library</p>
            </div>
            <AiOutlinePlus size={20} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={handleClick} />
        </div>
        <div className='flex flex-col gap-y-2 px-3 mt-4'>List of Songs!</div>
    </div>
  )
}
