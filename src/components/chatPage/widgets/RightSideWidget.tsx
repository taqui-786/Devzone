'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, UserPlus, Github, Twitter, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabaseClient } from '@/lib/supabase/supabaseClient'
import { useUser } from '@/lib/store/user'

export function UserActivityWidget() {
  const [recentJoins, setRecentJoins] = useState([
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Diana Prince", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 5, name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32" },
  ])
  const [notice, setNotice] = useState("Hello, user thank you so much testing it out it us currently in Beta. So, if you find out any bugs or issues or any feature idea contact me the link given below!")
  const { onlineUsersCount, setOnlineUsersCount } = useUser()

  useEffect(() => {
    const channel = supabaseClient.channel('users')

    channel
      .on('presence', { event: 'sync' }, () => {
        const newCount = Object.keys(channel.presenceState()).length
        setOnlineUsersCount(newCount)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [setOnlineUsersCount])
  

  return (
    <Card className="bg-gray-800 border-0 overflow-hidden h-full">
      <CardContent className="p-4 space-y-4 flex flex-col justify-evenly h-full">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="bg-purple-600 text-white px-3 py-1 text-sm flex items-center space-x-2">
            <motion.span
              key={onlineUsersCount}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {onlineUsersCount}
            </motion.span>
            <span>Active Now</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Badge>
          <motion.div 
            className="text-2xl font-bold text-purple-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 30 }}
          >
            TaquiImam
          </motion.div>
        </motion.div>

        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Recent Users Joined</h4>
          <AnimatePresence>
            {recentJoins.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 py-2 border-b border-gray-700 last:border-b-0"
              >
                <Avatar className="h-8 w-8 ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-300 flex-grow">{user.name}</span>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <UserPlus className="h-4 w-4 text-green-400" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="bg-gray-700 rounded-lg p-3 relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="h-5 w-5 text-yellow-400" />
              <h4 className="text-sm font-semibold text-white">Notice Board</h4>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{notice}</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center space-x-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8 }}
          >
            <Github className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8 }}
          >
            <Twitter className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-gray-400 hover:text-green-400 transition-colors"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.8 }}
          >
            <Mail className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </CardContent>
    </Card>
  )
}