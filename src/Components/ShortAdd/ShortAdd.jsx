import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/ContextStore";
import BtnLoader from "../Loader/BtnLoader";

const ShortAdd = () => {
  const { url, loader, setLoader } = useContext(StoreContext);
  const { chapterId, shortId, otherBook } = useParams();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [question, setQuestion] = useState({ question: "", answer: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());
    setLoader(true);

    try {
      const response = await fetch(
        `${url}/questions/${
          isEdit ? "updateQuestion/" + shortId : "addQuestion"
        }`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      setLoader(false);
      if (data.success) {
        setQuestion({ question: "", answer: "" });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  const fetchQuestion = async () => {
    const res = await fetch(`${url}/questions/getQuestion/${shortId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      setQuestion(data.question);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (shortId) {
      setIsEdit(true);
      fetchQuestion();
    }
  }, [shortId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-page">
      <h3 className="heading"> {isEdit ? "Edit" : "Add"} a Question</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="question">Question *:</label>
        <input
          type="text"
          value={question.question}
          id="question"
          name="question"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="answer">Answer:</label>
        <textarea
          name="answer"
          onChange={handleChange}
          value={question.answer}
          id="answer"
        ></textarea>
        <br />
        <br />
        <input type="hidden" name="chapterId" value={chapterId} />
        {location.pathname == `/gk/${otherBook}/shorts/add` ? (
          <input type="hidden" name="otherBook" value={otherBook} />
        ) : (
          <></>
        )}
        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : isEdit ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default ShortAdd;
