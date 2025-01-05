import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import BtnLoader from "../Loader/BtnLoader";

const Shorts = () => {
  const {
    url,
    books,
    loader,
    setLoader,
    setActionLoader,
    actionLoader,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const { bookId, chapterId, otherBook } = useParams();
  const [deletingId, setDeletingId] = useState(null);

  const book = books.find((allbooks) => allbooks._id === bookId);

  useEffect(() => {
    setLoader(true);
    const fetchQuestions = async () => {
      const response = await fetch(
        otherBook != undefined
          ? `${url}/gk/shorts`
          : `${url}/questions/getQuestions/${chapterId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        setLoader(false);
      } else {
        toast.error(data.message);
        setLoader(false);
      }
    };
    fetchQuestions();
  }, [bookId]);

  const deleteHandler = async (questionId) => {
    const confirmed = window.confirm("Are you sure to delete this question?");
    if (!confirmed) {
      return;
    }
    setDeletingId(questionId);
    setActionLoader(true);

    const response = await fetch(
      `${url}/questions/deleteQuestion/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const data = await response.json();
    setActionLoader(false);
    if (data.success) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2> {book?.title} </h2>
        <h2>Short Questins</h2>
        <button
          className="primaryBtn"
          onClick={() =>
            navigate(
              otherBook != undefined
                ? "/gk/" + otherBook + "/shorts/add"
                : "/books/book/" +
                    bookId +
                    "/chaptars/" +
                    chapterId +
                    "/short/add"
            )
          }
        >
          Add Question
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Questions</th>
                <th>Book Title</th>
                <th>Chapter</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="6">
                    <Loader />
                  </th>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No question Added
                  </td>
                </tr>
              ) : (
                questions.map((question, index) => (
                  <tr key={question._id || index}>
                    <td>{index + 1}</td>
                    <td>{question?.question}</td>
                    <td>{book?.title}</td>
                    <td>{question?.chapter?.title}</td>
                    <td
                      onClick={() =>
                        navigate(
                          "/books/book/" +
                            bookId +
                            "/chaptars/" +
                            chapterId +
                            "/short/" +
                            question._id +
                            "/edit"
                        )
                      }
                    >
                      <button>Edit</button>
                    </td>
                    <td onClick={() => deleteHandler(question._id)}>
                      <button>
                        {" "}
                        {question._id === deletingId && actionLoader ? (
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

export default Shorts;
