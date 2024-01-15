"use client"

import React, {useState} from "react"
import {Button} from "@/components/ui/button";
import CollectionSheet from "@/components/CollectionSheet";

const CollectionBtn = () => {
    const [open, setOpen] = useState(false)
    const handleOpenChange = (open: boolean) => setOpen(open)
    return (
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] mt-4 hover:-translate-y-[2px] hover:shadow-lg">
                <Button variant="outline"
                className="dark:text-white w-full bg-white dark:bg-neutral-950 hover:bg-white"
                onClick={() => setOpen(true)}>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
                        Create Collection
                    </span>
                </Button>
            <CollectionSheet open={open} onOpenChange={handleOpenChange}/>
        </div>
    )
}

export default CollectionBtn
