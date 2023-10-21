import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentAuthenticatedUser } = useAuth();

  const navigate = useNavigate();
  return (
    <nav className="nav">
      <div className="profileInfo">
        <img src={currentAuthenticatedUser.photoURL} alt="" />
        <p> {currentAuthenticatedUser.displayName} </p>
      </div>
      <div className="user">
        <button
          className="logout"
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
