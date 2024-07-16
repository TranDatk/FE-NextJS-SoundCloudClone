'use client'

import { useUserContext } from "@/lib/user.wrapper";
import { signOut, useSession } from "next-auth/react";

const VerifyComponent = () => {
    const { currentUser, setCurrentUser } = useUserContext() as IUserContext;
    const { data: session } = useSession();
    if (!currentUser?.isVerify && session?.user?.type === 'CREDENTIAL') {
        signOut({ callbackUrl: '/', redirect: false });
    }

    return (<></>)
}

export default VerifyComponent;