import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { ISong } from "@/types";

export const useLoadImage = (song: ISong) => {
  const supabaseClient = useSupabaseClient();
  
  if (!song) {
    return null;
  }
  const { data } = supabaseClient.storage.from('images').getPublicUrl(song.image_path);
  
  return data.publicUrl;
}