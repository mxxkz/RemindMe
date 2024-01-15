import React, {useEffect} from "react"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useForm} from "react-hook-form";
import {createCollectionSchema, createCollectionSchemaType} from "@/schema/createCollection";
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CollectionColors,CollectionColor} from "@/lib/constant";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {createCollection} from "@/actions/collection";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface Props {
    open:boolean,
    onOpenChange: (open:boolean) => void
}

const CollectionSheet = ({open, onOpenChange}: Props) => {
    const form = useForm<createCollectionSchemaType>({
        defaultValues:{},
        resolver: zodResolver(createCollectionSchema)
    })
    const router = useRouter()
    const onSubmit = async (data: createCollectionSchemaType) => {
        try {
            await createCollection(data)

            openChangeWrapper(false)
            router.refresh()
            toast({
                title: "Success",
                description: "Collection create successfully",
            })
        }catch (e:any) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive"
            })
        }
    }

    const openChangeWrapper = (open: boolean) => {
        form.reset();
        onOpenChange(open);
    };


    return(
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent>
                <SheetHeader className="mb-4">
                    <SheetTitle>Add new collection</SheetTitle>
                    <SheetDescription>Collection are a way to group your tasks</SheetDescription>
                </SheetHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4 flex flex-col">
                        <FormField control={form.control} name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Personal" {...field}/>
                                    </FormControl>
                                    <FormDescription>Collection name</FormDescription>
                                    <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="color"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>Color</FormLabel>
                                           <FormControl>
                                               <Select onValueChange={(color) => field.onChange(color)}>
                                                   <SelectTrigger className={cn(
                                                       "w-full h-8 dark:text-white text-neutral-800",
                                                      CollectionColors[field.value as CollectionColor],field.value ? "text-white":""
                                                   )}>
                                                       <SelectValue
                                                       placeholder="Color" className="w-full h-8"
                                                       />
                                                   </SelectTrigger>
                                                   <SelectContent className="w-full">
                                                       {Object.keys(CollectionColors).map((color) => (
                                                           <SelectItem key={color} value={color}
                                                           className={cn(`w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-stone-300 focus:ring-inset dark:focus:ring-white focus:px-8 focus:${CollectionColors[color as CollectionColor]}`
                                                           ,CollectionColors[color as CollectionColor])}>
                                                               {color}
                                                           </SelectItem>
                                                       ))}
                                                   </SelectContent>
                                               </Select>
                                           </FormControl>
                                           <FormDescription>Select a color for your collection</FormDescription>
                                           <FormMessage/>
                                       </FormItem>
                                   )}/>
                    </form>
                </Form>
                <div className="flex flex-col gap-3 mt-4">
                    <Separator />
                    <Button
                        disabled={form.formState.isSubmitting}
                        variant={"outline"}
                        className={cn(
                            "hover:translate-y-[-2px] hover:shadow-lg hover:bg-transparent",
                            form.watch("color") &&
                            CollectionColors[form.getValues("color") as CollectionColor],form.getValues("color") ? "text-white hover:text-white" : ""
                        )}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Confirm
                        {form.formState.isSubmitting && (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        )}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CollectionSheet
