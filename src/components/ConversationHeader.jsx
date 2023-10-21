import React from "react";
import Add from "../img/add.png";
import Cam from "../img/cam.png";
import More from "../img/more.png";
import { useChat } from "../contexts/ChatContext";

const ConversationHeader = () => {
  const { data } = useChat();
  return (
    <div className="conversationHeader">
      <p className="name"> {data.user.displayName} </p>
      <div className="actions">
        <img src={Cam} alt="" />
        <img src={Add} alt="" />
        <img src={More} alt="" />
      </div>
    </div>
  );
};

export default ConversationHeader;
