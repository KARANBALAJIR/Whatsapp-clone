import { AttachFile, MoreVert, SearchOutlined} from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Chat.css";
function Chat() {
  return (
  <div className="chat">
    <div className="chat__header">
      <Avatar />

      <div className="chat__headerInfo">
        <h3>Karan</h3>
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
  </div>
  );
}

export default Chat
