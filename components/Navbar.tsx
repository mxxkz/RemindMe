import React from 'react'
import SignInButton from "@/components/SignInButton";
import UserAccountNav from "@/components/UserAccountNav";
import {getAuthSession} from "@/lib/nextauth";
import {ThemeToggle} from "@/components/ThemeToggle";
import Link from "next/link";

type Props = {
}

const Navbar = async (props: Props) => {
    const session = await getAuthSession()
    console.log("Session:", session)
    return (
        <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-3">
            <div className="flex items-center justify-between h-full gap-2 px-6">
                <Link href={"/"} className="flex items-center gap-2">
                    <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                        RemindMe
                    </p>
                </Link>
                <div className={"flex items-center"}>
                    <ThemeToggle className="mr-3"/>
                    <div className="flex items-center">
                        {session?.user ? (
                                <UserAccountNav user={session.user}/>
                            ) :
                            (<SignInButton text={"Sign In"}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
