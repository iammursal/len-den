"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';


export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
        return <div>Loading...</div>
    }

    return <GoogleOAuthProvider clientId={clientId}>
        {children}
    </GoogleOAuthProvider>
}
