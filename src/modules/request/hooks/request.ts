import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {addRequestToCollection, saveRequest, getAllRequestFromCollection, Request, deleteRequest, editRequest} from "../actions"


export function useAddRequestToCollection (collectionId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (value: Request) => addRequestToCollection(collectionId, value),
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ["request", collectionId]})
            console.log(data)
        }
    })
}

export function useSaveRequest (id: string) {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async(value: Request) => saveRequest(id, value),
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ["request"]})
            console.log(data)
        }
    })
}

export function useGetRequestFromCollection (collectionId: string) {
    return useQuery({
        queryKey: ["request", collectionId],
        queryFn: async()=> getAllRequestFromCollection(collectionId)
    })
}

export function useDeleteRequest (id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:async() => deleteRequest(id),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["request"]})
        }
    })
}

export function useEditRequest (id: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async(value: Request)=> editRequest(id, value),
        
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["request"]})
        }
    })
}