'use client'

import {  buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Code2, Users, Zap, MessageSquare, Rocket, Globe, Lock, Coffee, Bell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import AnimatedBeam from "../Animations/MeteorBackgroud"

export default function LandingPageComponent() {
  return (
    <AnimatedBeam>
<div className="min-h-screen flex items-center justify-center bg-transparent text-white p-4">
      <div className="max-w-4xl mx-auto text-center bg-opacity-10 backdrop-blur-sm">
        <motion.div 
          className="flex flex-col items-center justify-center mb-6 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4 text-blue-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Where Code Meets Community</h1>
            <Users className="w-8 h-8 sm:w-12 sm:h-12 ml-2 sm:ml-4 text-green-400" />
          </div>
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            200+ users already joined
          </motion.div>
        </motion.div>
        <motion.p 
          className="text-base sm:text-lg md:text-xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="flex items-center justify-center flex-wrap">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
            DevZone is the ultimate chat platform for developers
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mx-2 text-purple-400" />
          </span>
          to connect, collaborate, and code together. Join the conversation and level up your coding journey.
        </motion.p>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col items-center">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-blue-400" />
            <span className="text-xs sm:text-sm">Global Community</span>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-green-400" />
            <span className="text-xs sm:text-sm">Secure Chats</span>
          </div>
          <div className="flex flex-col items-center">
            <Coffee className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-yellow-400" />
            <span className="text-xs sm:text-sm">Code & Coffee</span>
          </div>
          <div className="flex flex-col items-center">
            <Bell className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-purple-400" />
            <span className="text-xs sm:text-sm">Tech Updates</span>
          </div>
        </motion.div>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
            <Link href={'/join'} className={cn(buttonVariants({size:"lg"}),"w-full sm:w-auto")}>
            <Rocket className="w-4 h-4 mr-2" />
            Join DevZone
            </Link>
            {/* <Link href={'mdtaquiimam.vercel.app'} className={cn(buttonVariants({size:"lg", variant:"outline"}),"w-full sm:w-auto")}>
            <Sparkles className="w-4 h-4 mr-2" />
            Explore Features
          </Link> */}
        </motion.div>
      </div>
    </div>
    </AnimatedBeam>
  )
}