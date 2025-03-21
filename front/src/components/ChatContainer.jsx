import React, { useEffect, useRef } from 'react'
import { UseChatstore } from '../lib/UseChatstore'
import ChatHeader from './ChatHeader';
import MessageInput from "./MessageInput";
import {UseAuthstore} from "../lib/UseAuthstore"
import {formatMessageTime} from "../lib/time"

const ChatContainer = () => {
  const {messages,getMessages,selectedUser,newmsg,delnewmsg}=UseChatstore();
  const {authUser}=UseAuthstore();
  const messagesEndRef=useRef(null);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current && messages) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });}
  };
  useEffect(() => {
      getMessages(selectedUser._id);
      newmsg()
      scrollToBottom();
      return()=>delnewmsg();
  }, [messages]);

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((msg)=>(
          <div key={msg._id} className={`chat ${msg.senderId===authUser._id ?"chat-end" : "chat-start"}`} ref={messagesEndRef}>
            <div className='chat-image avatar'>
            <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectedUser.profilepic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
              </div>
          </div>
        ))}
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer
