import React, { createContext, useEffect, useState } from "react";

// Create Context
export const StoreContext = createContext(null);

// Context Provider Component
const ContextStore = ({ children }) => {
  const url = "http://localhost:3001/api";
  const [classes, setClasses] = useState([]);
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState("Add");
  const [loader, setLoader] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [setting, setSetting] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(sessionStorage.getItem("user") || {});
  const [token, setToken] = useState("");
  const [pastPapers, setPastPapers] = useState([]);
  const [guessPapers, setGuessPapers] = useState([]);
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [eBooks, seteBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [chapterTests, setChapterTests] = useState([]);

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

  // get past papers of a book
  const getPastPapers = async (id) => {
    setLoader(true);
    const response = await fetch(`${url}/pastPapers/book/${id}`);
    const data = await response.json();
    setLoader(false);
    if (data.success) {
      setPastPapers(data.data);
    }
  };

  // get Guess papers of a book
  const getGuessPapers = async (id) => {
    setLoader(true);
    const response = await fetch(`${url}/guessPapers/book/${id}`);
    const data = await response.json();
    setLoader(false);
    if (data.success) {
      setGuessPapers(data.data);
    }
  };

  // get all news
  const getNews = async (page) => {
    if (page === 1) {
      setLoader(true);
    }
    try {
      const res = await fetch(`${url}/blogs/all?page=${page}&limit=10`);
      const data = await res.json();
      setActionLoader(false);
      setLoader(false);
      if (data.success) {
        setNews([...news, ...data.blogs]);
        setHasMore(page < data.totalPages);
      } else {
        toast.error("Error during fetch news");
      }
    } catch (error) {
      toast.error("Error fetching news");
      console.error(error);
    }
  };

  // get all jobs
  const getJobs = async () => {
    setLoader(true);
    const response = await fetch(`${url}/jobs/all`);
    const data = await response.json();
    setLoader(false);
    if (data.success) {
      setJobs(data.jobs);
    }
  };

  // E-books
  const fetchEBooks = async () => {
    try {
      const res = await fetch(`${url}/eBooks/getEbooks`);
      const data = await res.json();
      if (data.success) {
        seteBooks(data.ebooks);
      } else {
        console.log("No books found in the collection.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get chapter tests
  const fetchChapterTests = async (chapterId) => {
    setLoader(true);
    try {
      const res = await fetch(`${url}/chapterTests/chapter/${chapterId}`);
      const data = await res.json();
      setLoader(false);
      if (data.success) {
        setChapterTests(data.data);
      } else {
        console.log("No books found in the collection.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    pastPapers,
    setPastPapers,
    getPastPapers,
    guessPapers,
    setGuessPapers,
    getGuessPapers,
    news,
    setNews,
    getNews,
    jobs,
    setJobs,
    getJobs,
    eBooks,
    seteBooks,
    fetchEBooks,
    page,
    setPage,
    hasMore,
    setHasMore,
    fetchChapterTests,
    setChapterTests,
    chapterTests,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextStore;
