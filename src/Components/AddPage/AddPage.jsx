import React, { useContext } from "react";
import "./AddPage.css";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import BtnLoader from "../Loader/BtnLoader";

const AddPage = () => {
  const { url, setClasses, loader, setLoader, token } =
    useContext(StoreContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${url}/classes/new`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const result = await response.json();
      setLoader(false);
      if (!result.success) {
        return toast.error(result.message);
      }

      setClasses((prevClasses) => [...prevClasses, result.newClass]);
      e.target.reset();

      // Provide user feedback
      toast.success(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error adding the book. Please try again.");
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">Add a Class</h3>
      <form className="add-form" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="name">Name *:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" name="tags" />
        <br />
        <br />

        <PrimaryBtn type="submit" text={loader ? <BtnLoader /> : "Add"} />
      </form>
    </div>
  );
};

export default AddPage;
