import { ISong } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSongsByUserId = async (): Promise<ISong[]> => {
   const supabase = createServerComponentClient({
    cookies: cookies
   })

   const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

   if(sessionError) {
      console.log(sessionError.message);
      return [];
   }

   const { 
      data, 
      error: songError 
   } = await supabase
   .from('songs')
   .select('*')
   .eq('user_id', sessionData.session?.user.id)
   .order('created_at', { ascending: false});

   if (songError) {
    console.log(songError.message);
   }

   return data || []
}