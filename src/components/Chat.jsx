import React from "react";
import Profile from "../img/profile.jpeg";
import { useChat } from "../contexts/ChatContext";

// eslint-disable-next-line react/prop-types
const Chat = ({ user, onClickChatHandler, children }) => {
  const { data } = useChat();
  return (
    <div
      className={`userChat ${data.user?.uid === user?.uid ? "selected" : ""} `}
      onClick={() => onClickChatHandler(user)}
    >
      <img src={user?.photoURL} alt="" />
      <div className="userChatInfo">
        <p>{user?.displayName}</p>
        <span className="lastMessage"> {children} </span>
      </div>
    </div>
  );
};

export default Chat;
