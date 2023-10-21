import { Conversation, Sidebar } from "../components";
import { useChat } from "../contexts/ChatContext";

const HomeScreen = () => {
  const { data } = useChat();

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        {data.user ? <Conversation /> : null}
      </div>
    </div>
  );
};

export default HomeScreen;
