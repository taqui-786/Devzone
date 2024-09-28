
import { Code, Terminal } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Profile from "./widgets/ProfileWidget"
import ClockWithPhoto from "./widgets/ClockWidget"
import ChatMessage from "./chatMessage"
import { UserActivityWidget } from "./widgets/RightSideWidget"
import SendMessage from "./SendMessage"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutBtn from "../authBtn/LogoutBtn"

export default function ChatPageMain() {
  return (
   <>
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Widget Area */}
      <div className="w-1/4 p-4 space-y-4 hidden lg:block">
        <Card className="bg-gray-800 shadow-lg p-4 h-1/2 border-0">
          <Profile />
        </Card>
        <Card className="bg-gray-800 shadow-lg p-4 h-1/2 border-0">
          <ClockWithPhoto/>
        </Card>
      </div>
      {/* Chat Area */}
      <div className="flex-1 relative flex flex-col">
        <div className="bg-gray-800 p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">DevZone</h1>
          </div>
          <DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline" size="icon" className="text-purple-400 border-gray-600 hover:bg-gray-700 hover:text-purple-300">
            <Code className="h-4 w-4" />
          </Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><LogoutBtn/></DropdownMenuItem>
    
  </DropdownMenuContent>
</DropdownMenu>

          
        </div>
        <ChatMessage/>
      <SendMessage/>
       
      </div>
 
      {/* Right Widget Area */}
      <div className="w-1/4 p-4 space-y-4 hidden lg:block">
        <UserActivityWidget/>
      </div>
    </div>
   </>
  )
}
// <CodeChat/>