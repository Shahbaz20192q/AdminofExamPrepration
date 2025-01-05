import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import Chaptar from "../Chaptar/Chaptar";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import BtnLoader from "../Loader/BtnLoader";

const Chaptars = () => {
  const {
    books,
    url,
    loader,
    setLoader,
    actionLoader,
    setActionLoader,
    token,
  } = useContext(StoreContext);
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const [chapters, setChapters] = useState([]);
  const book = books.find((book) => book._id === bookId);

  const currentPath = location.pathname;

  useEffect(() => {
    const fetchChapters = async () => {
      setLoader(true);
      if (!book?.chapters || book?.chapters.length === 0) {
        try {
          if (currentPath !== "/gk") {
            const res = await fetch(`${url}/chapters/${bookId}`);
            const data = await res.json();
            if (data.success) {
              setChapters(data.chapters);
              setLoader(false);
            } else {
              toast.error("Error during fetch data, try again.");
              setLoader(false);
            }
          }
        } catch (error) {
          toast.error("Failed to fetch chapters.");
          setLoader(false);
        }
      } else {
        setChapters(book.chapters);
        setLoader(false);
      }
    };

    fetchChapters();
  }, [bookId, url]);

  const deleteHandler = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this chapter?"
    );
    if (!confirm) {
      return;
    }
    setActionLoader(true);
    setDeletingId(id);
    try {
      const res = await fetch(`${url}/chapters/deleteChapter/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setActionLoader(false);
      setDeletingId(null);
      const data = await res.json();
      if (data.success) {
        setChapters(chapters.filter((preChapters) => preChapters._id !== id));
        toast.success(data.message);
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2> {book?.title} </h2>
        <h2> {currentPath == "/gk" ? "GK" : "Chapters"} </h2>
        <button
          className="primaryBtn"
          onClick={() => navigate("/books/book/" + bookId + "/chaptars/add")}
        >
          Add Chapter
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              {currentPath == "/gk" ? (
                <tr>
                  <th>MCQs</th>
                  <th>Short</th>
                </tr>
              ) : (
                <tr>
                  <th>No</th>
                  <th>Chapter Title</th>
                  <th>Book</th>
                  <th>MCQs</th>
                  <th>Short</th>
                  <th>Test</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              )}
            </thead>
            <tbody>
              {currentPath == "/gk" ? (
                <tr>
                  <td onClick={() => navigate("/gk/gk/mcqs")}>
                    <button>View</button>
                  </td>
                  <td onClick={() => navigate("/gk/gk/shorts")}>
                    <button>View</button>
                  </td>
                </tr>
              ) : loader ? (
                <tr>
                  <th colSpan="8">
                    <Loader />
                  </th>
                </tr>
              ) : chapters.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No Chapter Added
                  </td>
                </tr>
              ) : (
                chapters.map((chapter, index) => (
                  <tr key={chapter._id || index}>
                    <td>{index + 1}</td>
                    <td>{chapter?.title}</td>
                    <td>{book?.title}</td>
                    <td
                      onClick={() => {
                        navigate(
                          "/books/book/" +
                            book._id +
                            "/chaptars/" +
                            chapter._id +
                            "/mcqs"
                        );
                      }}
                    >
                      <button>View</button>
                    </td>
                    <td
                      onClick={() =>
                        navigate(
                          "/books/book/" +
                            bookId +
                            "/chaptars/" +
                            chapter._id +
                            "/short"
                        )
                      }
                    >
                      <button>View</button>
                    </td>

                    <td
                      onClick={() =>
                        navigate(
                          "/books/book/" +
                            bookId +
                            "/chaptars/" +
                            chapter._id +
                            "/test"
                        )
                      }
                    >
                      <button> View </button>
                    </td>

                    <td
                      onClick={() =>
                        navigate(
                          "/books/book/" +
                            bookId +
                            "/chaptars/" +
                            chapter._id +
                            "/edit"
                        )
                      }
                    >
                      <button>Edit</button>
                    </td>
                    <td onClick={() => deleteHandler(chapter._id)}>
                      <button>
                        {" "}
                        {chapter._id === deletingId && actionLoader ? (
                          <BtnLoader />
                        ) : (
                          "Delete"
                        )}{" "}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Chaptars;
