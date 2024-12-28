import React, { useContext, useEffect, useState } from "react";
import "./MCQs.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { MdDeleteOutline } from "react-icons/md";
import BtnLoader from "../Loader/BtnLoader";

const MCQs = () => {
  const { url, books, loader, setLoader, actionLoader, setActionLoader } =
    useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { bookId, chapterId, otherBook } = useParams();

  const [mCQs, setMCQs] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this mcq?");
    if (!confirm) {
      return;
    }
    setActionLoader(true);
    setDeletingId(id);
    const res = await fetch(`${url}/mcqs/deleteMcqs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setActionLoader(false);
    if (data.success) {
      toast.success(data.message);
      setMCQs((preMcqs) => preMcqs.filter((mcq) => mcq._id !== id));
    } else {
      toast.error(data.message);
    }
  };

  const book = books.find((b) => b._id == bookId);

  useEffect(() => {
    setLoader(true);

    const fetchMCQs = async () => {
      try {
        const response = await fetch(
          `${url}/${
            otherBook != undefined ? `gk/mcqs` : `mcqs/getMcqs/${chapterId}`
          }`
        );
        const data = await response.json();
        if (data.success) {
          setMCQs(data.mcqs);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMCQs();
  }, [chapterId]);
  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>MCQs</h2>
        <h3> {book?.title} </h3>
        <button
          className="primaryBtn"
          onClick={() => {
            if (location.pathname === `/meh/${chapterId}/mcqs`) {
              navigate("/meh/" + chapterId + "/mcqs/add");
            } else {
              navigate(
                otherBook != undefined
                  ? `/gk/${otherBook}/mcqs/add`
                  : "/books/book/" +
                      bookId +
                      "/chaptars/" +
                      chapterId +
                      "/mcqs/add"
              );
            }
          }}
        >
          Add MCQs
        </button>
      </div>
      <div className="mcqs">
        {loader ? (
          <Loader />
        ) : mCQs.length == 0 ? (
          <h1>No Question added</h1>
        ) : (
          mCQs.map((mcq, index) => (
            <div className="card" key={index}>
              <button
                className="mcq-delete primaryBtn"
                onClick={() => deleteHandler(mcq._id)}
              >
                {mcq._id === deletingId && actionLoader ? (
                  <BtnLoader />
                ) : (
                  <MdDeleteOutline />
                )}{" "}
              </button>
              <h2 className="question">
                {index + 1}. {mcq.question}{" "}
              </h2>
              <div className="options">
                {mcq.options.map((option, index) => (
                  <div
                    className={`option ${option.isCorrect ? "correct" : ""}`}
                    key={index}
                  >
                    {" "}
                    {option.optionText}{" "}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MCQs;
