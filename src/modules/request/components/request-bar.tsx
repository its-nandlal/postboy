import React from 'react'
import { RequestTab } from '../store/useRequestStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface RequestBarProps {
    tab: RequestTab;
    updateTab: (id: string, data:Partial<RequestTab>) => void
}

function RequestBar({tab, updateTab}: RequestBarProps) {
  

  const requestColorMap: Record<string, string> = {
    GET: "text-green-500",
    POST: "text-indigo-500",
    PUT: "text-yellow-500",
    PATCH: "text-orange-500",
    DELETE: "text-red-500",
  }

  const onSendRequest = async () => {

  }

  return (
    <div
    className='flex flex-row items-center justify-between bg-zinc-900 rounded-md p-2 w-full'>
      <div className='flex flex-row items-center gap-2 flex-1'>
        <Select
        value={tab.method}
        onValueChange={(value)=> updateTab(tab.id, {method: value})}>
          <SelectTrigger className={`w-24 ${requestColorMap[tab.method] || "text-gray-500"}`}>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='GET' className='text-green-500'>GET</SelectItem>
            <SelectItem value='POST' className='text-blue-500'>POST</SelectItem>
            <SelectItem value='PUT' className='text-yellow-500'>PUT</SelectItem>
            <SelectItem value='DELETE' className='text-red-500'>DELETE</SelectItem>
          </SelectContent>
        </Select>

        <Input
        value={tab.url || ""}
        onChange={(e)=> updateTab(tab.id, {url: e.target.value})}
        placeholder='Enter URL'
        className='flex-1'/>

        <Button
        type="submit"
        onClick={onSendRequest}
        // disabled={isPending || !tab.url}
        >
            <Send className='mr-2'/>
            Send
        </Button>
      </div>
    </div>
  )
}

export default RequestBar
