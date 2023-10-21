import React, { useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { currentAuthenticatedUser } = useAuth();
  const { data } = useChat();
  useEffect(() => {
    const fetchMessages = () => {
      const combinedId =
        currentAuthenticatedUser?.uid > data.user?.uid
          ? currentAuthenticatedUser?.uid + data.user?.uid
          : data.user?.uid + currentAuthenticatedUser?.uid;
      try {
        const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
          doc.exists() &&
            Object.entries(doc.data()).forEach((message) =>
              setMessages((currMessages) => message[1])
            );
        });

        return () => unsub();
      } catch (error) {
        console.log(error);
      }
    };

    currentAuthenticatedUser.uid && fetchMessages();
  }, [currentAuthenticatedUser.uid, data.user?.uid]);
  console.log(messages);
  return (
    <div className="messages">
      {messages.map((msg, key) => (
        <Message
          key={key}
          isOwner={msg.senderId === currentAuthenticatedUser.uid}
          msg={msg}
        />
      ))}
    </div>
  );
};

export default Messages;
