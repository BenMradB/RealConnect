import React from "react";
import ConversationHeader from "./ConversationHeader";
import Messages from "./Messages";
import Input from "./Input";

const Conversation = () => {
  return (
    <div className="conversation">
      <ConversationHeader />
      <Messages />
      <Input />
    </div>
  );
};

export default Conversation;
