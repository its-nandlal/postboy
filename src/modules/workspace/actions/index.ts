"use server"

import { prisma } from "@/lib/prisma"
import { MEMBER_ROLE } from "@prisma/client"
import { currentUser } from "@/modules/authentication/actions"



export const initializeWorkspace = async () => {

    const user = await currentUser()

    if(!user) return {
        success: false,
        error: "user not found"
    }

    try {
        
        const workspace = await prisma.workspace.upsert({
            where:{
                name_ownerId:{
                    ownerId: user.id,
                    name: "Personal Workspace"
                }
            }, 
            update:{},
            create:{
                name: "Personal Workspace",
                description: "Default workspace for personal user",
                ownerId: user.id,
                members: {
                    create: {
                        userId: user.id,
                        role: MEMBER_ROLE.ADMIN
                    }
                }
            },
            include:{
                members: true
            }
        })

        return {
            success: true,
            workspace
        }

    } catch (error) {
        return {
            success: false,
            error: `${"Filed to initialize workspace" + error}`
        }
    }

}

export const getWorkspaces = async () => {
    const user = await currentUser()

    if(!user) throw new Error("Unauthorized")

    const workspaces = await prisma.workspace.findMany({
        where:{
            OR:[
                {ownerId: user.id},
                {members:{some:{userId: user.id}}}
            ], 
        },
        orderBy:{createdAt:"asc"}
    })

    return workspaces
}

export const createWorkspace = async (name: string) => {
    const user = await currentUser()

    if(!user) throw new Error("Unauthorized")

    const workspace = await prisma.workspace.create({
        data:{
            name,
            ownerId: user.id,
            members:{
                create:{
                    userId: user.id,
                    role: MEMBER_ROLE.ADMIN
                }
            }
        }
    })

    return workspace
}


export const getWorkspaceById = async (id: string) => {
  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: true,
    },
  });
  return workspace;
};
