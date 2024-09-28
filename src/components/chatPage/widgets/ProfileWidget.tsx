'use client'
import { useUser } from "@/lib/store/user";
import { Dribbble, Facebook, Linkedin, X } from "lucide-react";

export default function Profile() {
const userData = useUser((user) => user.user)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 rounded-lg p-6 space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 opacity-20"></div>
        <div className="relative z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-75 w-28"></div>
            <img
              src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
              alt="Avatar Aang"
              className="w-24 h-24 rounded-full border-4 border-gray-800 relative z-10"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-white">{userData?.full_name}</h2>
            <p className="text-sm text-gray-300">{userData?.email}</p>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <X size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              <Dribbble size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    )
  }
