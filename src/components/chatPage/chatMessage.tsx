import InitMessages from '@/lib/store/initMessage'
import { getAllMessages } from '@/lib/supabase/Action'
import React, { Suspense } from 'react'
import ListMessages from './messageListing'

async function ChatMessage() {
    const message = await getAllMessages()
    
    return (
      <Suspense fallback="Loading...">
       <ListMessages/>
       <InitMessages messages={message as MessageType[]} />
      </Suspense>
    )
  
}

export default ChatMessage