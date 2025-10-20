import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCollection, deleteCollection, editCollection, createCollection } from "../actions"


export function useCollections (workspaceId: string){
    return useQuery({
        queryKey:["collections", workspaceId],
        queryFn:async()=>getCollection(workspaceId)
    })
}

export function useCreateCollection (workspaceId:string) {
    const queryClint = useQueryClient()
    return useMutation({
        mutationFn: async(name: string)=> createCollection({workspaceId, name}),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["collections", workspaceId]})
        }
    })
}


export function useDeleteCollection (workspaceId: string){
    const queryClint = useQueryClient()

    return useMutation({
        mutationFn: async()=>deleteCollection(workspaceId),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["collections"]})
        }
    })
}


export function useEditCollection (collectionId: string){
    const queryClint = useQueryClient()

    return useMutation({
        mutationFn: async(name: string)=>editCollection({collectionId, name}),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["collections"]})
        }
    })
}