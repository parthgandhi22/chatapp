import React, { useRef, useState } from "react";
import { UseChatstore } from "../lib/UseChatstore";
import toast from "react-hot-toast";
import { Image, X, Send } from "lucide-react";


const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagepreview, setImagepreview] = useState(null);
  //const [image,setImage]=useState(null);
  const { sendMessages } = UseChatstore();
  const fileinputref = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an Image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImagepreview(base64Image);
      // if (fileinputref) fileinputref.current.value = null;
    };
    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagepreview(null);
    if (fileinputref.current) fileinputref.current.value = "";
  };

  const handlesendmessage = async (e) => {
    e.preventDefault();
    try {
      await sendMessages({ text: text.trim(), image: imagepreview });
      setText("");
      setImagepreview(null);
      if (fileinputref.current) fileinputref.current.value = "";
    } catch (error) {
      console.log("Failed to send messages", error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagepreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagepreview}
              className="w-20 h-20 rounded-lg border-zinc-600"
            />
            <button
              type="button"
              onClick={removeImagePreview}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handlesendmessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Message"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileinputref}
            onChange={handleImageChange}
          />

          <button
            className="hidden sm:flex btn btn-circle text-emerald-500"
            type="button"
            onClick={() => {
              fileinputref.current?.click();
            }}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagepreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
