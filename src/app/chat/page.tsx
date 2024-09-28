import ChatPageMain from '@/components/chatPage/ChatPageMain'
import InitUser from '@/lib/store/initUser'
import { fetchUser } from '@/lib/supabase/Action'
import React from 'react'

 async function page() {
  const user:UserType  = await fetchUser()
  
  return (
    <>
    <ChatPageMain/>
    <InitUser  user={user} />
    </>
    
  )
}

export default page