"use client"

import React, { useState } from 'react'
import { useEditCollection } from '../hooks/collection';
import Modal from '@/components/ui/model';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EditCollectionModelProps{
    isModelOpen: boolean;
    setIsModelOpen: ((open: boolean)=> void)
    collectionId: string;
    initialName: string;
}

function EditCollectionModel({isModelOpen, setIsModelOpen, collectionId, initialName}: EditCollectionModelProps) {

    const [name, setName] = useState(initialName)
    const {mutateAsync, isPending} = useEditCollection(collectionId)

    const handleSubmit = async () => {
        if(!name.trim()) return;

        try {
            await mutateAsync(name)
            toast.success("Collection updated successfully")
            setIsModelOpen(false);
        } catch (error) {
            toast.error("Failed to update collection")
            console.error("Failed to update collection", error)
        }
    }

  return (
    <Modal
    title='Edit Collection'
    description='Rename your collection'
    isOpen={isModelOpen}
    onClose={()=> setIsModelOpen(false)}
    onSubmit={handleSubmit}
    submitText={isPending ? "Saving..." : "Save Changes"}
    submitVariant="default">
        <div className='space-y-4'>
            <Input 
            className='w-full p-2 border rounded'
            placeholder='Collection name...'
            value={name}
            onChange={(e)=> setName(e.target.value)}/>
        </div>
    </Modal>
  )
}

export default EditCollectionModel
