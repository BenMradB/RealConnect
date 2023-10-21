import React, { useEffect, useState } from "react";
import { FormContainer } from "../components";
import AddAavatar from "../img/addAvatar.png";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const { currentAuthenticatedUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) return;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (currentAuthenticatedUser) {
      navigate("/home", { replace: true });
      return;
    }
  }, [currentAuthenticatedUser, navigate]);
  return (
    <FormContainer>
      <div className="header">
        {error && (
          <strong
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "10px",
            }}
          >
            {error}
          </strong>
        )}
        <span className="logo">Real Time Chat Application</span>
        <span className="title">Login</span>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="file" id="avatar" hidden />
        <button>Sign in</button>
      </form>
      <p>
        you don't have an account? <Link to="/register"> Sign up </Link>
      </p>
    </FormContainer>
  );
};

export default LoginScreen;
