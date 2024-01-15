import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import SignInButton from "@/components/SignInButton";
import {getAuthSession} from "@/lib/nextauth";
import {redirect} from "next/navigation";


export default async function Home() {
    const session = await getAuthSession()
    if(session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className={"absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"}>
            <Card className={"w-[300px]"}>
                <CardHeader>
                    <CardTitle>
                        Welcome to RemindMe!!
                    </CardTitle>
                    <CardDescription>
                        Never Forget Again with RemindMe
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInButton text={"Sign In with Google"}/>
                </CardContent>
            </Card>
        </div>
    )
}
