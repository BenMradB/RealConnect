import Chat from "./Chat";

const Chats = ({ users, onClickChatHandler, children }) => {
  return (
    <ul className="chats">
      {children}
      {users.length
        ? users.map((user, key) => (
            <Chat
              key={key}
              user={user}
              onClickChatHandler={onClickChatHandler}
            />
          ))
        : null}
    </ul>
  );
};

export default Chats;
