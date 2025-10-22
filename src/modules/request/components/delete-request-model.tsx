"use client"

import Modal from "@/components/ui/model";
import { useDeleteRequest } from "../hooks/request";
import { toast } from "sonner";

interface DeleteRequestModelProps{
    isModelOpen: boolean;
    setIsModelOpen: ((open: boolean)=> void)
    requestId: string;
    requestName: string;
    collectionName: string;
}
function DeleteRequestModel({isModelOpen, setIsModelOpen, requestId, requestName, collectionName}: DeleteRequestModelProps) {
  
    const {mutateAsync, isPending} = useDeleteRequest(requestId)
  
    const handleSubmit = async () =>{
        try {
            await mutateAsync()
            toast.success(`${requestName} request delete successfully`)
            setIsModelOpen(false)
        } catch (error) {
            toast.error(`Failed to delete ${requestName} request`)
            console.error(`Failed to delete ${requestName} request`, error)
        }
    }
  
    return (
    <Modal
    title={`Delete ${requestName} request`}
    description={`Delete your ${requestName} › request in this ${collectionName} › collection `}
    isOpen={isModelOpen}
    onClose={()=> setIsModelOpen(false)}
    onSubmit={handleSubmit}
    submitText={isPending ? "Deleting..." : "Delete request"}
    submitVariant="default">
        <p>
            Once delete, 
            <span className="px-2 py-0.5 mx-2 bg-zinc-800 border border-zinc-900/50">
            {requestName} › request 
            </span>
            in this 
            <span className="px-2 py-0.5 mx-2 bg-zinc-800 border border-zinc-900/50">
            {collectionName} › collection 
            </span>
            will be permanently removed.
        </p>
    </Modal>
  )
}

export default DeleteRequestModel
