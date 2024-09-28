'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Code2, Users, MessageSquare, Calendar, Github } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginGoogleBtn from '../authBtn/LoginWithGoogleBtn'


export function JoinPageComponent() {
  const [name, setName] = useState<string >('')
  const [agreed, setAgreed] = useState(true)
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">Join DevZone!</h1>
        <p className="text-center text-gray-600 mb-6">Connect, chat, and collaborate with like-minded developers</p>
        
        <div className="flex justify-center space-x-2 mb-6">
        {['AL', 'BO', 'CH', 'DA', 'EV'].map((initials, index) => (
              <div
                key={initials}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg transform hover:scale-110 transition-transform duration-200 ${
                  ['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-red-400', 'bg-purple-400'][index]
                }`}
              >
                {initials}
              </div>
            ))}
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-6">Join 1,234 other members</p>
        
        <div className="flex justify-center space-x-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Active Community
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Live Chat
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Weekly Events
          </div>
        </div>
        
        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name as string}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(v:boolean) => setAgreed(v)} />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
          </div>
      
<Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
      <Button className="w-full" disabled={ name?.length < 3}>
            <Code2 className="w-4 h-4 mr-2" />
            Join DevZone
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Hey {name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-center text-gray-600 mb-4">
            Choose your preferred way to join:
          </p>
          {/* <Button 
            onClick={() => setOpen(false)} 
            className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow transition-colors duration-200"
          >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
            <span onClick={() => signInWithGoogle()}>Continue with Google</span>
          </Button> */}
          <LoginGoogleBtn callbackUrl='/chat' />
          <Button 
            onClick={() => setOpen(false)} 
            className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors duration-200"
            >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
          
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div> */}
        </form>
      </motion.div>
    </div>
  )
}