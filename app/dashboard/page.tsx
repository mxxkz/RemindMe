import {getAuthSession} from "@/lib/nextauth";
import {Suspense} from "react";
import {wait} from "@/lib/wait";
import {Skeleton} from "@/components/ui/skeleton";
import {prisma} from "@/lib/prisma";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {SmilePlus} from "lucide-react";
import CollectionBtn from "@/components/CollectionBtn";
import CollectionCard from "@/components/CollectionCard";
import {redirect} from "next/navigation";


export default async function Dashboard() {
    const session = await getAuthSession()
    if(!session?.user){
        return redirect('/')
    }
    return (
   <>
     <Suspense fallback={<WelcomeMsgFallback />}>
       <WelcomeMsg/>
     </Suspense>
       <Suspense fallback={<div>Collections Loading...</div>}>
           <CollectionList />
       </Suspense>
   </>
  )
}

const WelcomeMsg = async () => {
  const session = await getAuthSession()
    await wait(3000)
  if(!session?.user) {
    return <div>error</div>
  }
  return (
      <div className="flex w-full">
          <h1 className="text-4xl font-bold">Welcome, <br /> {session.user.name}</h1>
      </div>
  )
}

const WelcomeMsgFallback = () => {
  return (
      <div className="flex w-full">
          <h1 className="text-4xl font-bold">
              <Skeleton className="w-[150px] h-[36px]"/>
              <Skeleton className="w-[150px] h-[36px]"/>
          </h1>
      </div>
  )
}

const CollectionList = async () => {
    const session = await getAuthSession()
    const collections = await prisma.collection.findMany({
        include: {
            tasks:true,
        },
        where: {
            userId: session?.user.id,
        },
    })

    if(collections.length === 0){
        return (
            <div className="flex flex-col gap-5 mt-5">
                <Alert>
                    <SmilePlus />
                    <AlertTitle>There are no collections yet!</AlertTitle>
                    <AlertDescription>
                        Create a collection to get started
                    </AlertDescription>
                </Alert>
                <CollectionBtn />
            </div>
        )
    }

    return(
        <>
            <CollectionBtn/>
                <div className="flex flex-col gap-4 mt-6">
                    {collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
        </>
    )
}
