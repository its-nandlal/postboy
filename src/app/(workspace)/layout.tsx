import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import React, { PropsWithChildren } from 'react'

async function RootLayout({children}: PropsWithChildren) {

  const workspace = await initializeWorkspace()
  const user = await currentUser()


  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Header user={user} />


      {/* Main Container*/}
      <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden'>
          <div className='w-full h-full flex text-white'>
            <div className='w-12 border-zinc-800 bg-zinc-900'>
                tabeleft panel
            </div>

            <div className='flex-1 bg-zinc-900'>
                {children}
            </div>
          </div>
      </main>
    </>
  )
}

export default RootLayout
