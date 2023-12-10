"use client";

import { 
    useSessionContext, 
    useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { Modal } from './modal';
import { useAuthModal } from '@/custom-hooks/useAuthModal';
import { useEffect } from 'react';

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, close } = useAuthModal();

  const handleChange = (open: boolean) => {
    if(!open) {
        close();
    }
  }

  useEffect(() => {
    if(session) {
        router.refresh();
        close();
    }
  }, [close, router, session])

  return (
    <Modal 
        isOpen={isOpen}
        title="Welcome Back" 
        description="Login to your Account" 
        onChange={handleChange}
    >
        <Auth
            magicLink
            theme='dark'
            providers={["github"]}
            supabaseClient={supabaseClient} 
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }} 
        />
    </Modal>
  )
}
