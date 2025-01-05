import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import BtnLoader from "../../Components/Loader/BtnLoader";

const MEH = () => {
  const { token, url, loader, setLoader, actionLoader, setActionLoader } =
    useContext(StoreContext);
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoader(true);
      try {
        const res = await fetch(`${url}/meh/chapters`);
        const data = await res.json();

        if (data.success) {
          setChapters(data.chapters);
          setLoader(false);
        } else {
          toast.error("Error during fetch data, try again.");
          setLoader(false);
        }
      } catch (error) {
        toast.error("Failed to fetch chapters.");
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
      const data = await res.json();
      setActionLoader(false);
      if (data.success) {
        setChapters(chapters.filter((preChapters) => preChapters._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2> MEH </h2>
        <h2>Chapters</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate("/meh/chapter/add")}
        >
          Add Chapter
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Chapter Title</th>
                <th>MCQs</th>
                <th>Short</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="7">
                    <Loader />
                  </th>
                </tr>
              ) : chapters.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Chapter Added
                  </td>
                </tr>
              ) : (
                chapters.map((chapter, index) => (
                  <tr key={chapter._id || index}>
                    <td>{index + 1}</td>
                    <td>{chapter?.title}</td>
                    <td
                      onClick={() => {
                        navigate("/meh/" + chapter._id + "/mcqs");
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

export default MEH;
