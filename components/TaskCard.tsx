"use client"
import {Task} from "@prisma/client"
import React, {useTransition} from "react"
import {useRouter} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";
import {format} from "date-fns"
import {setTaskToDone} from "@/actions/task";

// function getExpirationStyle(expiresAt:Date) {
//     const days= Math.floor(expiresAt.getTime() - Date.now())/1000/60/60
//     if(days < 0) return "text-gray-300 dark:text-gray-400"
//     if(days <= 3*24 || days === 0) return "text-red-500 dark:text-red-400"
//     if(days <= 7*24) return "text-orange-500 dark:text:orange-400"
//     return "text-green-500 dark:text-green-400"

function getExpirationStyle(expiresAt: Date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for currentDate
    expiresAt.setHours(0, 0, 0, 0);   // Set time to midnight for expiresAt

    const days = Math.floor((expiresAt.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24);

    if (days < 0) return "text-gray-300 dark:text-gray-400"; // Past expiration
    if (days === 0) return "text-red-500 dark:text-red-400"; // Today
    if (days <= 3) return "text-red-500 dark:text-red-400"; // Within 3 days
    if (days <= 7) return "text-orange-500 dark:text-orange-400"; // Within 7 days
    return "text-green-500 dark:text-green-400"; // More than 7 days
}


export default function TaskCard({task}: {task:Task}){
    const [isLoading, startTransition] = useTransition()
    const router = useRouter()

    return (
        <div className="flex gap-2 items-start">
            <Checkbox
            id={task.id.toString()}
            className="w-5 h-5"
            checked={task.done}
            disabled={task.done || isLoading}
            onCheckedChange={()=>
            startTransition(async () => {
                await setTaskToDone(task.id)
                router.refresh()
            })
            }
            />
            <label
            htmlFor={task.id.toString()}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
                task.done && "line-through"
            )}
            >
                {task.content}
                {task.expiresAt && (
                    <p className={cn(
                        "text-xs text-neutral-500 dark:text-neutral-400",
                        getExpirationStyle(task.expiresAt)
                    )}>
                        {format(task.expiresAt, "dd/MM/yyyy")}
                    </p>
                )}
            </label>
        </div>
    )
}
