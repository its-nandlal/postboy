import { Hint } from '@/components/ui/hint'
import { useWorkspaces } from '@/modules/workspace/hooks/workspace'
import { Loader, Plus, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useWorkspacesStore } from '../store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import CreateWorkspace from './create-workspace'

function WorkSpace() {

  const [isModelOpen, setIsModelOpen] = useState(false)

  const {data: workspace, isLoading} = useWorkspaces()
  const {selectedWorkspace, setSelectedWorkspace} = useWorkspacesStore()

  useEffect(()=>{
    if(workspace && workspace.length > 0 && !selectedWorkspace){
      setSelectedWorkspace(workspace[0])
    }
  },[workspace, selectedWorkspace, setSelectedWorkspace])

  if(isLoading) return (
    <Loader className=' animate-spin size-4 text-indigo-400' />
  )

  if(!workspace || workspace.length === 0) return (
    <div className='font-semibold text-indigo-400'>No Workspace Found</div>
  )

  return (
    <>
    <Hint label='Change Workspace'>
        <Select
        value={selectedWorkspace?.id}
        onValueChange={(id: string)=>{
          const ws = workspace.find(w => w.id === id)
          if(ws) setSelectedWorkspace(ws)
        }}>
          <SelectTrigger
          className='border border-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-400 hover:text-indigo-300 flex flex-row items-center space-x-1'>
           <User className='size-4 text-indigo-400' />
           <span className='text-sm text-indigo-400 font-semibold'>
              <SelectValue placeholder="Select workspace" />
           </span>
          </SelectTrigger>

          <SelectContent>
            {workspace.map(ws=>(
              <SelectItem key={ws.id} value={ws.id}>{ws.name}</SelectItem>
            ))}



          <Separator className="my-1" />

          <div className='w-full p-2 flex'>
            <span className='w-full text-sm font-semibold text-zinc-600'>
              <Button 
              variant={"ghost"}
              className='w-full flex cursor-pointer'
              onClick={()=> setIsModelOpen(!isModelOpen)}>
                <Plus size={16} className='text-indigo-400'/>
                 New Workspace
              </Button>

            </span>
          </div>
          </SelectContent>



        </Select>
    </Hint>

    <CreateWorkspace isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} />
    </>
  )
}

export default WorkSpace
