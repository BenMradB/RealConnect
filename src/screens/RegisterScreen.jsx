import AddAavatar from "../img/addAvatar.png";
import { FormContainer } from "../components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterScreen = () => {
  const { currentAuthenticatedUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (!userName || !email || !password) return;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `${Date.now()}-${userName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              uid: res.user.uid,
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email,
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/home");
          });
        }
      );
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
        <span className="title">Register</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="file" id="avatar" hidden />
        <label htmlFor="avatar">
          <img src={AddAavatar} alt="" />
          <span> Choose an avatar</span>
        </label>
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to="/login"> Login </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterScreen;
