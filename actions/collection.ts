"use server"
import {createCollectionSchemaType} from "@/schema/createCollection";
import {getAuthSession} from "@/lib/nextauth";
import {prisma} from "@/lib/prisma";

export async function createCollection(form: createCollectionSchemaType) {
    const session = await getAuthSession()

    if(!session){
        throw new Error("user not found")
    }

    return await prisma.collection.create({
        data: {
            userId: session.user.id,
            color: form.color,
            name: form.name,
        }
    })
}

export async function deleteCollection(id: bigint) {
    const session = await getAuthSession()
    if(!session){
        throw new Error("user not found")
    }

    return await  prisma.collection.delete({
        where: {
            id: id,
            userId: session.user.id
        }
    })
}
