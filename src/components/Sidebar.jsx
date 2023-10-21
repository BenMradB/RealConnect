import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Chats from "./Chats";
import { useAuth } from "../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useChat } from "../contexts/ChatContext";

const Sidebar = () => {
  const { currentAuthenticatedUser } = useAuth();
  const { chatDispatch } = useChat();
  const [chats, setChats] = useState({});
  let users = [];

  chats &&
    Object?.entries(chats).forEach(
      (chat) => (users = [...users, chat[1].userInfo])
    );

  useEffect(() => {
    const getUserChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentAuthenticatedUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => unsub();
    };

    currentAuthenticatedUser.uid && getUserChats();
  }, [currentAuthenticatedUser.uid]);

  const handleSelectChat = (friend) => {
    chatDispatch({ type: "CHANGE_USER", payload: friend });
  };
  return (
    <div className="sideBar">
      <Navbar />
      <SearchBar />
      <Chats users={users} onClickChatHandler={handleSelectChat}>
        <strong
          style={{
            color: "#FFF",
            marginTop: "20px !important",
            padding: "20px",
          }}
        >
          Friends List
        </strong>
      </Chats>
    </div>
  );
};

export default Sidebar;
