'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Collection, Task } from '@prisma/client'
import { CollectionColor, CollectionColors } from '@/lib/constant'
import React, { useMemo, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import TaskCard from '@/components/TaskCard'
import { TaskDialog } from '@/components/TaskDialog'
import { cn } from '@/lib/utils'
import { deleteCollection } from '@/actions/collection'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface Props {
  collection: Collection & {
    tasks: Task[]
  }
}

export default function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, startTransition] = useTransition()

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id)
      toast({
        title: 'Success',
        description: 'Collection deleted successfully',
      })
      router.refresh()
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Cannot delete collection',
        variant: 'destructive',
      })
    }
  }

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length
  }, [collection.tasks])

  const totalTasks = collection.tasks.length

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100

  return (
    <>
      <TaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={'ghost'}
            className={cn(
              'flex w-full justify-between p-6',
              isOpen && 'rounded-b-none',
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <ChevronDown className="h-6 w-6 text-white" />}
            {isOpen && <ChevronUp className="h-6 w-6 text-white" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-950 shadow-lg">
          {collection.tasks.length > 0 ? (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {collection.tasks.map((task, index) => (
                  <TaskCard key={`${task.id}-${index}`} task={task} />
                ))}
              </div>
            </>
          ) : (
            <Button
              variant={'ghost'}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <>
                <span>There are no tasks yet:</span>
                <span
                  className={cn(
                    'text-sm bg-clip-text text-transparent',
                    CollectionColors[collection.color as CollectionColor]
                  )}
                >
                  Create one
                </span>
              </>
            </Button>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center ">
            <p>Created at {collection.createdAt.toLocaleDateString('en-US')}</p>
            {isLoading ? (
              <div>Deleting...</div>
            ) : (
              <div>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}>
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undo. This will permanently delete
                      your collection and all tasks inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection)
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}
