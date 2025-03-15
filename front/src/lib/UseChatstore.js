import {create } from "zustand"
import {toast} from "react-hot-toast"
import {axiosInstance } from "./axios.js"
import {UseAuthstore} from "./UseAuthstore.js"

export const UseChatstore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,

    getUsers:async()=>{
        set({isUserLoading:true})
        try{
            const res=await axiosInstance.get("/message/users");
            set({users:res.data})
        }
        catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessageLoading:true})
        try{
            const res=await axiosInstance(`/message/${userId}`);
            set({messages:res.data})
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoading:false})
        }
    },

    sendMessages:async (msg)=>{
        const {selectedUser,messages}=get();
        try{
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,msg);
            set({messages:[...messages,res.data]})
        }catch(error){
            toast.error(error.response.data.message)
        }
    },

    newmsg:()=>{
        const {selectedUser}=get();
        if (!selectedUser) return;

        const socket=UseAuthstore.getState().socket
        socket.on("New msg",(data)=>{
            if (data.senderId!==selectedUser._id) return;
            set({messages:[...get().messages,data]})
        })  
    },

    delnewmsg:()=>{
        const socket=UseAuthstore.getState().socket
        socket.off("New msg")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}
))