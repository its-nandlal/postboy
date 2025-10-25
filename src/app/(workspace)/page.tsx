"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import TabbedSidebar from "@/modules/workspace/components/sidebar";

import { useWorkspacesStore } from "@/modules/layout/store";
import { useGetWorkspace } from "@/modules/workspace/hooks/workspace";
import { Loader } from "lucide-react";
import RequestPlaygrount from "@/modules/request/components/request-playgrount";

export default  function Home() {

  const {selectedWorkspace} = useWorkspacesStore()

  const {data:currentWorkspace, isPending} = useGetWorkspace(selectedWorkspace?.id!)

  if(isPending){
    return(
      <div className=" h-full flex flex-col items-center justify-center">
        <Loader className=" animate-spin h-6 w-6 text-indigo-500" />
      </div>
    )
  }

  return (
    <>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={65} minSize={40}>
        <RequestPlaygrount/>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={35} maxSize={40} minSize={25}>
        <div className="flex-1">
          <TabbedSidebar currentWorkspace={currentWorkspace!}/>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </>
  );
}
