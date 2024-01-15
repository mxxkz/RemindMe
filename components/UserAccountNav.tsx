"use client"
import React from 'react'
import type {User} from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {signOut} from "next-auth/react";
import UserAvatar from "@/components/UserAvatar";


type Props = {
    user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav = ({user}:Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user}></UserAvatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-neutral-950" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium dark:text-white">{user.name}</p>}
                        {
                            user.email && (
                                <p className="w-[200px] truncate text-sm text-zinc-700 ">
                                    {user.email}
                                </p>
                            )
                        }
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(event) => {
                    event.preventDefault()
                    signOut().catch(console.error)
                }} className="text-red-600 cursor-pointer"
                >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UserAccountNav
