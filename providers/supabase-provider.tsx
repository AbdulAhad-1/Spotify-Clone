"use client";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/types_db";

interface ISupabaseProvider {
    children: React.ReactNode
}

export const SupabaseProvider: React.FC<ISupabaseProvider> = ({
    children
}) => {
  const [supabaseClient] = useState(() => createClientComponentClient<Database>())
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
  )
}
