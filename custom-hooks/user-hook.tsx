import { User } from "@supabase/auth-helpers-nextjs";
import { 
    useSessionContext, 
    useUser as useSupaUser 
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

import { ISubscription, IUserDetails } from "@/types"

type UserContexType = {
    accessToken: string | null,
    user: User | null,
    userDetails: IUserDetails | null,
    isLoading: boolean,
    subscription: ISubscription | null
}

export const UserContext = createContext<UserContexType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [loadingData, setLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [subscription, setSubscription] = useState<ISubscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single();

    useEffect(() => {
        if(user && !loadingData && !userDetails && !subscription) {
            setLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                ([userDetailPromise, subscriptionPromise]) => {
                    if(userDetailPromise.status === "fulfilled") {
                        setUserDetails(userDetailPromise.value.data as IUserDetails)
                    }
                    if(subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as ISubscription)
                    }

                    setLoadingData(false);
                }
            )
        } else if(!user && !isLoadingUser && !loadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || loadingData,
        subscription
    }
    return <UserContext.Provider value={value} {...props}></UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
}