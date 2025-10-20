"use server"

import { prisma } from "@/lib/prisma";


interface CreateCollectionProps {
    workspaceId: string;
    name: string
}


interface EditCollectionProps {
    collectionId: string;
    name: string;
}


export const createCollection = async ({workspaceId, name}: CreateCollectionProps) => {
    const collection = await prisma.collection.create({
        data:{
            name,
            workspace:{
                connect:{
                    id: workspaceId
                }
            }
        }
    })

    return collection
}

export const getCollection = async (workspaceId: string) => {
    const collection = await prisma.collection.findMany({
        where:{workspaceId}
    })

    return collection
}


export const deleteCollection = async (collectionId: string) => {
    await prisma.collection.delete({
        where:{
            id: collectionId
        }
    })
}


export const editCollection = async ({collectionId, name}: EditCollectionProps) => {
    await prisma.collection.update({
        where:{
            id: collectionId
        },
        data:{
            name
        }
        
    })
}
