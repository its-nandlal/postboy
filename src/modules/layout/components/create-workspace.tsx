 "use client"

import { Input } from "@/components/ui/input";
 import Model from "@/components/ui/model"
import { useCreateWorkspace } from "@/modules/workspace/hooks/workspace";
import { useState } from "react";
 import { toast } from "sonner"


 interface CreateWorkspaceProps {
    isModelOpen: boolean;
    setIsModelOpen: ((open: boolean) => void)
 }

 const CreateWorkspace = ({isModelOpen, setIsModelOpen}: CreateWorkspaceProps) => {
    const [name, setName] = useState("")
    const {mutateAsync, isPending} = useCreateWorkspace()

    const handleSubmit = async()=>{
      if(!name.trim()) return;
      
      try {
        await mutateAsync(name);
        toast.success("Workspace created successfully")
        setName("")
        setIsModelOpen(false)
      } catch (error) {
        toast.error("Faild to create workspace")
        console.error("Faild to create workspace", error)
      }
    }

    return(
        <Model
        title="Add new workspace"
        description="Create a new workspace to organize your projects"
        isOpen={isModelOpen}
        onClose={()=> setIsModelOpen(false)}
        onSubmit={handleSubmit}
        submitText={isPending ? "Creating..." : "Create Workspace"}
        submitVariant="default">
            <div className="space-y-4">
                <Input 
                className="w-full p-2 border rounded-sm"
                placeholder="Workspace name"
                value={name}
                onChange={(e)=> setName(e.target.value)}/>
            </div>
        </Model>
    )
 }

 export default CreateWorkspace