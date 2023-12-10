"use client";

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal, useUser } from '@/custom-hooks';
import { useUploadModal } from '@/custom-hooks/useUploadModal';
import { ISong } from '@/types';
import { MediaItem } from './mediaItem';

type IProps = {
  songs: ISong[]
}

export const Library: React.FC<IProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal  = useUploadModal();
  const { user } = useUser()
  const handleClick = () => {
    if(!user) {
      authModal.open();
    } else
    return uploadModal.open()
  }
  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist className='text-neutral-400' size={26} />
                <p className='font-medium text-neutral-400 text-base'>Your Library</p>
            </div>
            <AiOutlinePlus size={20} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={handleClick} />
        </div>
        <div className='flex flex-col gap-y-2 px-3 mt-4'>
          {songs.length ? songs.map((item) => <MediaItem key={item.id} data={item} onClick={() => {}} />) : <div className="text-neutral-400">No available songs!</div>}
        </div>
    </div>
  )
}
