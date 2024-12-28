import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const { setClasses, classes, setAction, url } = useContext(StoreContext);
  const location = useLocation();
  const actionName = location.pathname.split("/")[2];
  const cls = classes.find((cls) => cls._id === id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cls) {
      setFormData({
        name: cls.name || "",
        description: cls.description || "",
        tags: cls.tags || "",
      });
    }
    setAction(actionName);
  }, [cls, actionName, setAction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${url}/classes/class/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setClasses((prevClasses) =>
          prevClasses.map((cls) => (cls._id === id ? data.updatedClass : cls))
        );
      }

      toast.success("Class updated successfully!");
    } catch (err) {
      setError("Failed to update class. Please try again.");
      toast.error("Failed to update class.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">Edit {actionName}</h3>
      {error && <p className="error-message">{error}</p>}
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="name">Name *:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <br />
        <br />

        <PrimaryBtn
          type="submit"
          text={loading ? "Updating..." : "Update"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default EditPage;
