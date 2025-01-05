import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const ChapterTests = () => {
  const {
    url,
    loader,
    setLoader,
    fetchChapterTests,
    chapterTests,
    setChapterTests,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  useEffect(() => {
    if (chapterTests.length === 0) {
      fetchChapterTests(chapterId);
    }
  }, []);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this Test?");
    if (!confirm) {
      return;
    }
    setLoader(true);
    try {
      const response = await fetch(`${url}/chapterTests/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      setLoader(false);
      if (data.success) {
        toast.success(data.message);
        setChapterTests(
          chapterTests.filter((prevTests) => prevTests._id !== id)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error During delete this test");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>Tests</h2>
        <button
          className="primaryBtn"
          onClick={() =>
            navigate(
              "/books/book/" + bookId + "/chaptars/" + chapterId + "/test/add"
            )
          }
        >
          Add Test
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Chapters</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="5">
                    <Loader />
                  </th>
                </tr>
              ) : chapterTests.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Test Added
                  </td>
                </tr>
              ) : (
                chapterTests.map((test, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {test.title} </td>
                    <td> {test.chapter.title} </td>
                    <td
                      onClick={() =>
                        navigate(
                          "/books/book/" +
                            bookId +
                            "/chaptars/" +
                            chapterId +
                            "/test/" +
                            test._id +
                            "/edit"
                        )
                      }
                    >
                      {" "}
                      <button>Edit</button>{" "}
                    </td>
                    <td onClick={() => deleteHandler(test._id)}>
                      {" "}
                      <button>Delete</button>{" "}
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

export default ChapterTests;
