'use server'

import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import { supabaseServer } from "./supabaseServer";

export const createUser = async (payload: any) => {
    const supabase = await supabaseServer().from('users').insert({full_name:payload?.name,google_name:payload?.name, email: payload?.email})
      
    if (supabase.statusText === 'Created') {
      return { status: "success"};
    }
    return { status: "error", message: supabase.error };
  };
  
  export const isUserExists = async (email: string) => {
    const supabase = await supabaseServer()
      .from("users")
      .select("*")
      .eq("email", email);
      
    if (supabase.data?.length) {
      return { status: "exists"};
    }
    return { status: "success" };
  };
  export async function handleGoogleAuth(myCallbackUrl:string){
    await signIn('google', {redirectTo:myCallbackUrl})
    // await signOut({redirectTo:"/"})
  }
export const getAllMessages = async()=> {
    try {
        const {data} = await supabaseServer().from('messages').select("*,users(*),likes(*)")
        return data 
        
    } catch (error) {
        return error
    }
}



// Get user from database
export const fetchUser = async () => {
    try {
        
        const nextAuthUser = await auth()
        if(!nextAuthUser) return redirect('/')
        const {data} = await supabaseServer().from('users').select('*').eq('email',nextAuthUser?.user?.email)
        return data?.[0]
    } catch (error) {
        return null
    }
}

// Create a message in the database
export const createMessage = async (message:MessageType) => {
    try {
        const {data, error} = await supabaseServer().from('messages').insert([message])
        if(error != null) return {status: false}
        return {status: true}
    } catch (error) {
        console.error('Error creating message:', error)
    }
}

