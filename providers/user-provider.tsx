"use client";

import { UserContextProvider } from "@/custom-hooks/user-hook";

interface UserProviderProps {
    children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}