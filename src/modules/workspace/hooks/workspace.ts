import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {createWorkspaces, getWorkspace, getWorkspaceById} from "../actions"

export function useWorkspaces(){
    return useQuery({
        queryKey:["workspaces"],
        queryFn:async ()=> getWorkspace()
    })
}


export function useCreateWorkspace(){
    const queryClint = useQueryClient()

    return useMutation({
        mutationFn: async(name:string)=>createWorkspaces(name),
        onSuccess:()=>{
            queryClint.invalidateQueries({queryKey:["workspaces"]})
        }
    })
}


export function useGetWorkspace(id:string){
    return useQuery({
        queryKey:["workspace", id],
        queryFn: async()=> getWorkspaceById(id)
    })
}