import React, { useContext, useState } from "react";
import "./MCQ.css"; // Import the CSS file for styling
import { useParams, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import BtnLoader from "../Loader/BtnLoader";

const MCQForm = () => {
  const { url, books, classes, loader, setLoader } = useContext(StoreContext);
  const { chapterId, bookId, otherBook } = useParams();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ]);
  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = event.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
  };

  const book = books.find((b) => b._id == bookId);
  const chapter = book?.chapters.find((c) => c._id == chapterId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ensure a correct option is selected
    const hasCorrectOption = options.some((option) => option.isCorrect);
    if (!hasCorrectOption) {
      alert("Please select the correct option.");
      return;
    }
    setLoader(true);

    const mcqData = {
      question,
      options,
      chapterId,
      otherBook,
    };

    try {
      const response = await fetch(`${url}/mcqs/addMcqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mcqData),
      });
      setLoader(false);

      if (!response.ok) {
        throw new Error("Failed to submit MCQ.");
      }

      const data = await response.json();
      toast.success(data.message);

      // Reset form
      setQuestion("");
      setOptions([
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ]);
    } catch (error) {
      console.error("Error creating MCQ:", error);
    }
  };

  return (
    <>
      <div className="header-box">
        <h2>Mcqs</h2>
        <h3> {chapter?.title} </h3>
        <h3>{book?.title}</h3>
      </div>
      <div className="mcq-form-container">
        <form onSubmit={handleSubmit} className="mcq-form">
          <div className="form-group">
            <label>Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="form-input"
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="form-group">
              <label>Option {String.fromCharCode(65 + index)}:</label>
              <input
                type="text"
                value={option.optionText}
                onChange={(e) => handleOptionChange(index, e)}
                required
                className="form-input"
              />
            </div>
          ))}
          <div className="form-group">
            <label>Correct Option:</label>
            <div className="correct-option-container">
              {options.map((_, index) => (
                <label key={index} className="correct-option-label">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={options[index].isCorrect}
                    onChange={() => handleCorrectOptionChange(index)}
                  />
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </label>
              ))}
            </div>
          </div>

          <PrimaryBtn
            text={loader ? <BtnLoader /> : "Submit MCQ"}
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default MCQForm;
