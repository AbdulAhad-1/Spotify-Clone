"use client";

import uniqid from 'uniqid'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useUser } from '@/custom-hooks';
import { useUploadModal } from '@/custom-hooks/useUploadModal';

import { Modal } from './modal';
import { Input } from './input';
import { Button } from './button';

const defaultValues = {
    author: '',
    title: '',
    song: null,
    image: null
};

export const UploadModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const {isOpen, close} = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const {reset, handleSubmit, register} = useForm<FieldValues>({
    defaultValues: defaultValues
  })

  const handleModalClose = () => {
    reset()
    close();
  }

  const handleChange = (open: boolean) => {
      if (!open) {
        handleModalClose();
      }
  }

  const uploadFile = useCallback(async (file: any, bucket: 'songs' | 'images', uniqId: string) => {
    const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .upload(uniqId, file, {
      cacheControl: '3600',
      upsert: false
    })

    return { data, error };

  }, [supabaseClient.storage])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if(!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const id = uniqid();
  
      const {data: songData, error: songError} = await uploadFile(songFile, 'songs', `song-${values.title}-${id}`);
      const {data: imageData, error: imageError} = await uploadFile(imageFile, 'images', `image-${values.title}-${id}`);

      if (songError || imageError) {
        setIsLoading(false);
        toast.error('Failed to upload');
        return;
      }

      const { 
        error: supabaseError
      } = await supabaseClient
      .from('songs')
      .insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        song_path: songData?.path,
        image_path: imageData?.path,
      });

      if(supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      handleModalClose();
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal 
        isOpen={isOpen}
        title="Add a Song" 
        description="Upload an mp3 file" 
        onChange={handleChange}
    >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Input
                id="title"
                disabled={isLoading}
                placeholder="Song Title" 
                {...register('title', { required: true})} 
            />
            <Input
                id="author"
                disabled={isLoading}
                placeholder="Song Author" 
                {...register('author', { required: true})} 
            />
            <div>
              <div className='pb-1'>Select a song</div>
              <Input
                id="song"
                type='file'
                accept='.mp3'
                disabled={isLoading}
                {...register('song', { required: true})} 
            />
            </div>
            <div>
              <div className='pb-1'>Select an image</div>
              <Input
                id="image"
                type='file'
                accept='image/*'
                disabled={isLoading}
                {...register('image', { required: true})} 
            />
            </div>
            <Button type="submit" disabled={isLoading}>Create</Button>
        </form>
    </Modal>
  )
}
