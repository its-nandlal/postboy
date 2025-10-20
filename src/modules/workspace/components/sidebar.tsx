import React, { useState } from "react";
import { useCollections } from "../../collections/hooks/collection";
import { Archive, Clock, Code, ExternalLink, HelpCircle, Loader, Plus, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateCollection from "../../collections/components/create-collection";
import EmptyCollections from "@/modules/collections/components/empty-collection";
import CollectionFolder from "@/modules/collections/components/collection-folder";

interface TabbedSidebarProps {
  currentWorkspace: {
    id: string;
    name: string;
  };
}

function TabbedSidebar({ currentWorkspace }: TabbedSidebarProps) {
  const [activeTab, setActiveTab] = useState("Collections");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const { data: collections, isPending } = useCollections(currentWorkspace.id);

  if (isPending) {
    return (
      <div className=" h-full flex flex-col items-center justify-center">
        <Loader className=" animate-spin h-6 w-6 text-indigo-500" />
      </div>
    );
  }

  const sidebarItem = [
    {icon: Archive, lable: "Collections"},
    {icon: Clock, lable: "History"},
    {icon: Share2, lable: "Share"},
    {icon: Code, lable: "Code"}
  ]

  const renderTabContent = () => {
    switch(activeTab){
      case "Collections":
        return (
          <div className="h-full bg-zinc-900 text-zinc-100 flex flex-col">

            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-400">{currentWorkspace.name}</span>
                <span className="text-zinc-600">›</span>
                <span className="text-sm font-medium">Collections</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
                <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
              </div>
            </div>

            <div className="p-4 border-b border-zinc-800">
              <div className=" relative">
                <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4
                text-zinc-400" />
                <input 
                type="text"
                placeholder="Search"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"/>
              </div>
            </div>

            <div className="p-4 border-b border-zinc-800">
              <Button variant={"ghost"} onClick={() => setIsModelOpen(!isModelOpen)}>
                <Plus className="w-4 h-4"/>
                <span className="text-sm font-medium">New</span>
              </Button>
            </div>

            {
              collections && collections.length > 0 ? (
                collections.map((collection) => (
                  <div 
                  key={collection.id}
                  className="flex flex-col justify-start items-start p-3 border-b border-zinc-800 w-full">
                    <CollectionFolder collection={collection}/>
                  </div>
                ))
              ) : (
                  <EmptyCollections/>
              )
            }

          </div>
        )

        default:
          return <div className="p-4 text-zinc-400">Select a tab to view content</div>;
    }
  }

  return (
    <div className="flex h-screen bg-zinc-900">
      <div className="w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
        {sidebarItem.map((item, index) => (
          <div
          key={index}
          onClick={() => setActiveTab(item.lable)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
          activeTab === item.lable
          ? "bg-indigo-600 text-white"
          : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800"}`}>
            <item.icon className="w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="flex-1 bg-zinc-900 overflow-y-auto">{renderTabContent()}</div>

      <CreateCollection
      workspaceId={currentWorkspace.id}
      isModelOpen={isModelOpen}
      setIsModelOpen={setIsModelOpen} />
      
    </div>
  )
}

export default TabbedSidebar;
