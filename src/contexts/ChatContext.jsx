import { createContext, useContext, useReducer } from "react";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { currentAuthenticatedUser } = useAuth();
  const INITIAL_STATE = {
    user: null,
    chatId: null,
  };

  const chatReducer = (state, { type, payload }) => {
    switch (type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: payload,
          chatId:
            currentAuthenticatedUser.uid > payload.uid
              ? currentAuthenticatedUser.uid + payload.uid
              : payload.uid + currentAuthenticatedUser.uid,
        };
      default:
        return state;
    }
  };
  const [chatState, chatDispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{
        data: chatState,
        chatDispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("Context used outside a provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ChatProvider, useChat };
