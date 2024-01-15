"use server"



import {getAuthSession} from "@/lib/nextauth";
import {createTaskSchemaType} from "@/schema/createTask";
import {prisma} from "@/lib/prisma";

export async function createTask(data: createTaskSchemaType){
    const session = await getAuthSession()
    if(!session){
        throw new Error("user not found")
    }

    const {content, expiresAt, collectionId} = data
    return await prisma.task.create({
        data: {
            userId: session.user.id,
            content,
            expiresAt,
            Collection: {
                connect: {
                    id: collectionId
                }
            }
        }
    });
}

export async function setTaskToDone(id: bigint) {
    const session = await getAuthSession()
    if(!session){
        throw new Error("user not found")
    }
    return await prisma.task.update({
        where: {
            id: id,
            userId: session.user.id
        },
        data: {
            done: true
        }
    })
}
