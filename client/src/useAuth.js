import { createContext, useCallback, useMemo, useState } from "react";
const jwt = require("jsonwebtoken");
const config = require("./config");

let initState = { user: null };

const auth = localStorage.getItem("auth");

if (auth) {
  const token = auth.split(" ")[1];
  let decodedUser = null;
  try {
    decodedUser = jwt.verify(token, config.JWT_SECRET);
    if (decodedUser.exp * 1000 < Date.now()) {
      localStorage.removeItem("auth");
    } else {
      initState.user = decodedUser;
    }
  } catch (error) {
    console.log(error);
    localStorage.removeItem("auth");
  }
}

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initState.user);
  const login = useCallback((user, token) => {
    localStorage.setItem("auth", token);
    setUser(user);
  });

  const logout = useCallback(() => {
    localStorage.removeItem("auth");
    setUser(null);
  });

  const providerValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
