import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/ContextStore";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import BtnLoader from "../Loader/BtnLoader";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddPastPaper = () => {
  const { url, loader, pastPapers, token } = useContext(StoreContext);
  const [isEdit, setIsEdit] = useState(false);
  const { bookId, paperId } = useParams();
  const location = useLocation();

  const [paper, setPaper] = useState(
    pastPapers.find((paper) => paper._id === paperId) || null
  );

  useEffect(() => {
    const fetchPastPaper = async () => {
      if (location.pathname.includes("edit")) {
        try {
          const res = await fetch(`${url}/pastPapers/pastPaper/${paperId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          if (data.success) {
            setPaper(data.data);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Error during fetch paper data");
        }
      }
    };
    if (!paperId || !paper) {
      fetchPastPaper();
    }
  }, [paperId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());
    try {
      const apiUrl = isEdit
        ? `${url}/pastPapers/update/${paperId}` // Update endpoint
        : `${url}/pastPapers/add`; // Add endpoint

      const res = await fetch(apiUrl, {
        method: isEdit ? "PUT" : "POST", // Use PUT for update, POST for add
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        if (!isEdit) e.target.reset(); // Reset form only in Add mode
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during form submission");
    }
  };

  useEffect(() => {
    if (location.pathname === `/pastpapers/${bookId}/${paperId}/edit`) {
      setIsEdit(true);
    }
  }, [location, bookId, paperId]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPaper((prevPaper) => ({
      ...prevPaper,
      [name]: value,
    }));
  };

  return (
    <div className="add-page">
      <h3 className="heading"> {isEdit ? "Edit" : "Add"} a Past Paper</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          value={paper?.title || ""}
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
          value={paper?.description || ""}
          onChange={changeHandler}
          id="description"
          name="description"
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          onChange={changeHandler}
          value={paper?.tags || ""}
          id="tags"
          name="tags"
        />
        <br />
        <br />

        <label htmlFor="year">Year:</label>
        <input
          type="text"
          onChange={changeHandler}
          value={paper?.year || ""}
          id="year"
          name="year"
        />
        <br />
        <br />

        <label htmlFor="link">Link:</label>
        <input
          type="url"
          onChange={changeHandler}
          value={paper?.link || ""}
          id="link"
          name="link"
        />
        <br />
        <br />
        <input type="hidden" id="bookId" name="bookId" value={bookId} />

        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : isEdit ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default AddPastPaper;
