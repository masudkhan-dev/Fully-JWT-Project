import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );
  const [loginTime, setLoginTime] = useState(
    localStorage.getItem("loginTime") || null
  );

  const login = (data) => {
    const { token, email, name } = data;
    setToken(token);
    setUserEmail(email);
    setUserName(name);
    setLoginTime(new Date().toLocaleString());

    ["token", "userEmail", "userName", "loginTime"].map((key, index) =>
      localStorage.setItem(
        key,
        [token, email, name, new Date().toLocaleString()][index]
      )
    );
  };

  const register = (data) => {
    const { token, email, name } = data;
    setToken(token);
    setUserEmail(email);
    setUserName(name);
    setLoginTime(new Date().toLocaleString());

    ["token", "userEmail", "userName", "loginTime"].map((key, index) =>
      localStorage.setItem(
        key,
        [token, email, name, new Date().toLocaleString()][index]
      )
    );
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setUserName(null);
    setLoginTime(null);

    ["token", "userEmail", "userName", "loginTime"].map((key) =>
      localStorage.removeItem(key)
    );
  };

  const isAuthenticate = () => {
    return !!token;
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUserEmail(localStorage.getItem("userEmail"));
      setUserName(localStorage.getItem("userName"));
      setLoginTime(localStorage.getItem("loginTime"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    token,
    userEmail,
    userName,
    loginTime,
    login,
    register,
    logout,
    isAuthenticate,
  };
};

export default useAuth;
