import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Chats from "./Chats";
import { useAuth } from "../contexts/AuthContext";

const SearchBar = () => {
  const { currentAuthenticatedUser } = useAuth();
  const [userName, setUserName] = useState("");
  const [foundedUsers, setFoundedUsers] = useState([]);

  const searchHandler = async () => {
    const usersRef = collection(db, "users");
    const _query = query(usersRef, where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(_query);
      querySnapshot.forEach((doc) => {
        setFoundedUsers((currUsers) => [...currUsers, doc.data()]);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickChatHandler = async (selectedUser) => {
    setFoundedUsers([]);
    setUserName("");
    const combinedId =
      currentAuthenticatedUser.uid > selectedUser.uid
        ? currentAuthenticatedUser.uid + selectedUser.uid
        : selectedUser.uid + currentAuthenticatedUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create a userChats
        // The shape of the userChats doc will be like this:
        // {
        //     combinedId: {
        //       userInfo: {
        //         displayName, phtoURL, uid
        //       },
        //       lastMessage: "",
        //       date: serverTimestamp()
        //     }
        // }
        await updateDoc(doc(db, "userChats", currentAuthenticatedUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [`${combinedId}.lastMessage`]: "",
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentAuthenticatedUser.uid,
            displayName: currentAuthenticatedUser.displayName,
            photoURL: currentAuthenticatedUser.photoURL,
          },
          [`${combinedId}.lastMessage`]: "",
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onKeyDownHandler = (e) => {
    if (!userName) return;
    e.code === "Enter" && searchHandler();
  };
  return (
    <>
      <div className="searchBar">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={onKeyDownHandler}
          type="text"
          placeholder="Find a user"
        />
      </div>
      <Chats users={foundedUsers} onClickChatHandler={onClickChatHandler} />
      <hr />
    </>
  );
};

export default SearchBar;
