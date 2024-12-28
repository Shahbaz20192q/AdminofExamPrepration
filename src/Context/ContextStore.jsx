import React, { createContext, useEffect, useState } from "react";

// Create Context
export const StoreContext = createContext(null);

// Context Provider Component
const ContextStore = ({ children }) => {
  const url = "https://backendofexamprepration.up.railway.app/api";
  const [classes, setClasses] = useState([]);
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState("Add");
  const [loader, setLoader] = useState(true);
  const [actionLoader, setActionLoader] = useState(false);
  const [setting, setSetting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(sessionStorage.getItem("user") || {});
  const [token, setToken] = useState("");

  const getClasses = async () => {
    try {
      const response = await fetch(`${url}/classes`);
      const data = await response.json();
      setClasses(data.classes);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getBooks = async () => {
    try {
      const response = await fetch(`${url}/books/getAllBooks`);
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
        setLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await fetch(`${url}/setting/setting`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setSetting(data.setting);
          setIsEditing(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSetting();
  }, [url]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchLoggedIn();
    }
  }, [token]);

  const fetchLoggedIn = async () => {
    try {
      const response = await fetch(`${url}/users/loggedInAdmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        sessionStorage.setItem("user", data.user);
      } else {
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
    getBooks();
  }, []);

  // Provide both state and updater function
  const contextValue = {
    url,
    classes,
    setClasses,
    action,
    setAction,
    books,
    setBooks,
    loader,
    setLoader,
    setting,
    setSetting,
    isEditing,
    setIsEditing,
    token,
    setToken,
    user,
    setUser,
    actionLoader,
    setActionLoader,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextStore;
