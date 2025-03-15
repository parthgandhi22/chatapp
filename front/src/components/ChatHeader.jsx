import { X } from "lucide-react";
import { UseChatstore } from "../lib/UseChatstore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = UseChatstore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilepic || "/avatar.svg"}
                alt={selectedUser.fullname}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullname}</h3>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
        <X/></button>
        
      </div>
    </div>
  );
};
export default ChatHeader;
