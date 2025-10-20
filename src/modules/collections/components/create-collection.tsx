import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/model';
import { useCreateCollection } from '@/modules/collections/hooks/collection';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface CreateCollectionProps{
    workspaceId: string;
    isModelOpen: boolean
    setIsModelOpen: ((open: boolean)=> void)
}


function CreateCollection({workspaceId, isModelOpen, setIsModelOpen}: CreateCollectionProps) {

    const [name, setName] = useState("")
    const {mutateAsync, isPending} = useCreateCollection(workspaceId)
  
  
    const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name); 
      toast.success("Collection created successfully");
      setName("");
      setIsModelOpen(false);
    } catch (err) {
      toast.error("Failed to create Collection");
      console.error("Failed to create Collection:", err);
    }
  };

  return (
    <Modal
    title='Add New Collection'
    description='Create a new collection to organize your requests'
    isOpen={isModelOpen}
    onClose={()=> setIsModelOpen(false)}
    onSubmit={handleSubmit}
    submitText={isPending ? "Creating..." : "Create Collection"}
    submitVariant='default'>
        <div className='space-y-4'>
            <Input 
            className='w-full p-2 border rounded'
            value={name}
            onChange={(e)=> setName(e.target.value)}/>
        </div>
    </Modal>
  )
}

export default CreateCollection
