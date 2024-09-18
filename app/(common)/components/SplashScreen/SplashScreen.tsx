'use client'

import { Button } from "@/components/ui/button";
import { Layer } from "@/components/ui/layer";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import PersonalFinanceIllustration from '../../assets/Personal_Finance_Illustration.svg';


export const SplashScreen = () => {
    // const [IsSplashScreenShown, setIsSplashScreenShown] = useGeneralStore((state: GeneralStore) => [state.IsSplashScreenShown, state.setIsSplashScreenShown])

    // if (IsSplashScreenShown) {
    //     return <></>
    // }

    return <Layer index={10} className="bg-background">

        <div className="flex flex-col  w-screen h-screen items-center z-50 justify-center py-8 ">

            <Image
                className='mb-16'
                src={PersonalFinanceIllustration}
                alt="Personal Finance Illustration"
                width={150}
                priority
            />

            <h1 className='text-3xl font-bold text-center mb-8'>
                {/* subtitle */}
                Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>

            <p className='px-8 mb-8 text-center'>
                {process.env.NEXT_PUBLIC_APP_NAME} is the ultimate tool for tracking your personal finances related to your lending and borrowing activities.
                Whether you lend money to your friends, borrow money from your family, or use any other form of credit,
                our finance app will help you stay on top of your finances.
            </p>

            <Link href="/auth/login">
                <Button variant="default" type="button">
                    Get Started &ensp;<AiOutlineArrowRight />
                </Button>
            </Link>

            {/* <Login /> */}
        </div>
    </Layer>
}
