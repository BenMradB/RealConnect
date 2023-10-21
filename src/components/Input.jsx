import { useState } from "react";
import Attach from "../img/attach.png";
import Image from "../img/img.png";
import Send from "../img/send.png";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentAuthenticatedUser } = useAuth();
  const { data } = useChat();
  const [messageText, setMessageText] = useState("");
  const [image, setImage] = useState(null);

  const sendMessage = async () => {
    setMessageText("");
    setImage(null);
    const messageRef = doc(db, "chats", data.chatId);
    try {
      if (image) {
        const storageRef = ref(storage, `messagesImage-${Date.now()}-${image}`);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                // Atomically add a new region to the "regions" array field.
                await updateDoc(messageRef, {
                  messages: arrayUnion({
                    msgId: crypto.randomUUID(),
                    senderId: currentAuthenticatedUser.uid,
                    message: messageText,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        // Atomically add a new region to the "regions" array field.
        await updateDoc(messageRef, {
          messages: arrayUnion({
            msgId: crypto.randomUUID(),
            senderId: currentAuthenticatedUser.uid,
            message: messageText,
            date: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="inputComponent">
      <input
        type="text"
        placeholder="Type something ..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <div className="">
        <input type="file" id="sendAttach" hidden />
        <img src={Attach} alt="" />
        {/* <label htmlFor="sendAttach">
        </label> */}
        <input
          type="file"
          id="sendImages"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="sendImages">
          <img src={Image} alt="" />
        </label>
        <button onClick={sendMessage}>
          <img src={Send} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Input;
