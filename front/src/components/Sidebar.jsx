import React, { useEffect } from 'react'
import { UseChatstore } from '../lib/UseChatstore'
import SidebarSkeleton from "./SidebarSkeleton"
import { Users } from 'lucide-react'
const Sidebar = () => {
  const {getUsers,users,selectedUser,setSelectedUser,isUserLoading}=UseChatstore();
   
  const onlineusers=[]
  useEffect(()=>{
    getUsers();
  },[getUsers])

  if (isUserLoading) return <SidebarSkeleton/>

  return (
    <div>
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilepic || "/avatar.svg"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
    </div>
  )
}

export default Sidebar
