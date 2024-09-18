'use client'
import { getAllSpreadSheets } from '@/services/api/google/sheet';
import { AuthStore, useAuthStore } from '@/stores/auth';
import useGeneralStore, { GeneralStore } from '@/stores/general';
import { useGoogleLogin } from '@react-oauth/google';
// import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ContinueOfflineButton, GoogleLoginButton } from './Buttons';
import { useAuth } from '../../hooks';

export const Login = () => {
    const router = useRouter()
    const { auth, setAuth } = useAuth()
    const [IsOfflineOnly, setIsOfflineOnly] = useGeneralStore((state: GeneralStore) => [state.IsOfflineOnly, state.setIsOfflineOnly])

    // const
    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            console.log(codeResponse)

            if (!codeResponse || !codeResponse.code) {
                toast('Error', {
                    description: 'Something went wrong',
                })
                return;
            }

            // fetch access token using codeResponse.code
            const response = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                // @ts-ignore
                body: new URLSearchParams({
                    code: codeResponse.code,
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
                    redirect_uri: 'http://localhost:3000',
                    grant_type: 'authorization_code',
                }),
            });

            try {
                const data = await response.json();
                console.log('Success:', data);
                setAuth(data);
                router.push('/dashboard')
            } catch (error) {
                console.error('Error:', error);
            }

        },
        flow: 'auth-code',
        scope: process.env.NEXT_PUBLIC_GOOGLE_AUTH_SCOPE,
    })

    // Authentication
    // Google OAuth2 authentication
    const handleGoogleLogin = () => {
        login()
    }

    // Continue offline
    const handleContinueOffline = () => {
        setIsOfflineOnly(true)
        router.push('/dashboard')
    }



    return <div className='flex flex-col items-center '>

        <h2 className='text-2xl font-bold mb-8'>Login</h2>

        <div className='flex flex-col justify-between gap-4'>
            <GoogleLoginButton onClick={handleGoogleLogin} />
            <ContinueOfflineButton onClick={handleContinueOffline} />
        </div>


    </div >
}
