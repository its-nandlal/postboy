import React, { useEffect, useState } from 'react'
import { useRequestPlaygroundStore } from '../store/useRequestStore'
import { toast } from 'sonner'
import Modal from '@/components/ui/model'
import { Input } from '@/components/ui/input'

function AddNameModal({isModalOpen, setIsModalOpen, tabId}: {isModalOpen: boolean, setIsModalOpen: (open: boolean) => void, tabId: string}) {
  
  const {updateTab, tabs, markUnsaved} = useRequestPlaygroundStore()
  const tab = tabs.find(t => t.id === tabId)
  const [name, setName] = useState(tab?.title || "")

  useEffect(()=>{
    if(tab) setName(tab.title)
  }, [tabId])

  const handleSubmit = async ()=>{
    if(!name.trim()) return;
    try {
      updateTab(tabId, {title: name})
      markUnsaved(tabId, true)
      toast.success("Tab renamed successfully")
      setIsModalOpen(false)

    } catch (error) {
      toast.error("Failed to rename tab")
      console.error("Rename tab error:", error)
    }
  }

  return (
    <Modal
    title='Rename Request'
    description="Give a new name to your request tab."
    isOpen={isModalOpen}
    onClose={()=> setIsModalOpen(false)}
    onSubmit={handleSubmit}
    submitText='Save'
    submitVariant="default">
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <Input
          className='w-full p-2 border rounded bg-zinc-900 text-white'
          placeholder='Request Name...'
          value={name}
          onChange={(e)=> setName(e.target.value)}/>
        </div>
      </div>
    </Modal>
  )
}

export default AddNameModal













