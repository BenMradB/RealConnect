import React from "react";
import Send from "../img/send.png";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

const Message = ({ isOwner, msg }) => {
  const { currentAuthenticatedUser } = useAuth();
  const { data } = useChat();
  const date = new Date(
    msg.date.seconds * 1000 + msg.date.nanoseconds / 1000000
  );
  const currentMonth = new Date().getMonth();

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  return (
    <div className={`message ${isOwner ? "owner" : ""}`}>
      <span className="timing">
        {currentMonth - month > 28 ? `${day}/${month}/${year}` : null} {hours}:
        {minutes} {amOrPm}
      </span>
      <div className="messageContainer">
        <div className="messageInfo">
          <img
            src={
              isOwner ? currentAuthenticatedUser.photoURL : data.user.photoURL
            }
            alt=""
          />
        </div>
        {msg.message ? (
          <div className="messageContent">
            <span>{msg.message}</span>
          </div>
        ) : null}
      </div>
      {msg.img ? <img src={msg.img} alt="" /> : null}
    </div>
  );
};

export default Message;
