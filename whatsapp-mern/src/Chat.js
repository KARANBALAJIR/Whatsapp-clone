import { AttachFile, MoreVert, SearchOutlined} from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import axios from "axios";
import "./Chat.css";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    

    await axios.post("http://localhost:9000/messages/new", {
      message:input,
      name: "Karan",
      timestamp: "Just now!",
      received: false,
    });

    setInput("");
  };


  return (
  <div className="chat">
    <div className="chat__header">
      <Avatar />

      <div className="chat__headerInfo">
        <h3>Contact Name 1</h3>
        <p>Last seen at...</p>
      </div>

      <div className="chat__headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>
    <div className="chat__body">
      {messages.map((message) => (
        <p 
        className={`chat__message ${message.received && "chat__reciever"}`}
        >
        <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__timestamp">{message.timestamp}</span>
        </p>

      ))}
    </div>

    <div className="chat__footer">
       <IconButton>
      <EmojiEmotionsIcon />
       </IconButton>
      <form>
        <input 
        value = {input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Type a message"
        type="text"
        />
      <button onClick={sendMessage} type="submit">Send a message</button>
      </form>
      <IconButton> 
      <MicIcon />
      </IconButton>
    </div>
  </div>
  );
}

export default Chat;
