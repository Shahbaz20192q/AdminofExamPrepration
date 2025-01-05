import React, { useContext, useEffect, useState } from "react";
import BtnLoader from "../Loader/BtnLoader";
import { StoreContext } from "../../Context/ContextStore";
import { useParams } from "react-router-dom";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { toast } from "react-toastify";

const AddChapterTest = () => {
  const { url, loader, setLoader, setChapterTests, chapterTests, token } =
    useContext(StoreContext);
  const { bookId, chapterId, testId } = useParams(); // `testId` for edit mode
  const [isEdit, setIsEdit] = useState(false);
  const [test, setTest] = useState({
    title: "",
    description: "",
    tags: "",
    link: "",
  });

  // Fetch test details for edit mode
  useEffect(() => {
    if (testId) {
      setIsEdit(true);
      const fetchTestDetails = async () => {
        try {
          setLoader(true);
          const response = await fetch(`${url}/chapterTests/${testId}`);
          const data = await response.json();
          setTest(data.data);
        } catch (error) {
          console.error("Failed to fetch test details:", error);
        } finally {
          setLoader(false);
        }
      };
      fetchTestDetails();
    }
  }, [testId]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTest((prevTest) => ({
      ...prevTest,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const endpoint = isEdit
        ? `${url}/chapterTests/${testId}`
        : `${url}/chapterTests/add`;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          ...test,
          chapterId,
        }),
      });
      const result = await response.json();

      if (result.success) {
        // Update chapterTests context
        if (isEdit) {
          setChapterTests((prevTests) =>
            prevTests.map((item) => (item._id === testId ? result.data : item))
          );
        } else {
          setChapterTests((prevTests) => [...prevTests, result.data]);
        }

        if (!isEdit) {
          setTest({ title: "", description: "", tags: "", link: "" });
        }
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving test:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">{isEdit ? "Edit" : "Add"} a Test Paper</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          value={test.title || ""}
          onChange={changeHandler}
          id="title"
          name="title"
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          value={test.description || ""}
          onChange={changeHandler}
          id="description"
          name="description"
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          value={test.tags || ""}
          onChange={changeHandler}
          id="tags"
          name="tags"
        />
        <br />
        <br />

        <label htmlFor="link">Link:</label>
        <input
          type="url"
          value={test.link || ""}
          onChange={changeHandler}
          id="link"
          name="link"
        />
        <br />
        <br />

        <input type="hidden" name="chapterId" value={chapterId} />

        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : isEdit ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default AddChapterTest;
