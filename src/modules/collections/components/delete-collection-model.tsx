"use client"

import Modal from '@/components/ui/model';
import React from 'react'
import { useDeleteCollection } from '../hooks/collection';
import { toast } from 'sonner';

interface DeleteCollectionModelProps{
    isModelOpen: boolean;
    setIsModelOpen: ((open: boolean)=> void)
    collectionId: string;
}
function DeleteCollectionModel({isModelOpen, setIsModelOpen, collectionId}: DeleteCollectionModelProps) {

    const {mutateAsync, isPending} = useDeleteCollection(collectionId)

    const handleSubmit = async () => {
        try {
            await mutateAsync()
            toast.success("Collection delete succeffsully")
            setIsModelOpen(false)
        } catch (error) {
            toast.error("Failed to delete collection")
            console.error("Failed to delete collection", error)
        }
    }

    return (
    <Modal
    title='Delete Collection'
    description='Delete your collection'
    isOpen={isModelOpen}
    onClose={()=> setIsModelOpen(false)}
    onSubmit={handleSubmit}
    submitText={isPending ? "Deleting..." : "Delete Collection"}
    submitVariant="default">
      <p className="text-sm text-zinc-500">
        Once deleted, all requests and data in this collection will be permanently removed.
      </p>
 
    </Modal>
  )
}

export default DeleteCollectionModel
