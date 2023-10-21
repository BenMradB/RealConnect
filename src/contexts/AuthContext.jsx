import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser] = useState({});
  useEffect(() => {
    const unSub = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentAuthenticatedUser(user);
      },
      []
    );

    return () => unSub();
  });
  return (
    <AuthContext.Provider
      value={{
        currentAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context used outside a provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
