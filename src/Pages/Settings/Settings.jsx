import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const Settings = () => {
  const { url, setting, setSetting, isEditing, setIsEditing, token } =
    useContext(StoreContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const settingData = Object.fromEntries(formData.entries()); // Convert FormData to an object

    const res = await fetch(
      `${url}/setting${isEditing ? "/" + setting._id : ""}`,
      {
        method: isEditing ? "PUT" : "POST", // Use PUT for updating existing settings
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(settingData),
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      setSetting(data.setting);
      setIsEditing(true);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">Setting</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="name">Name *:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={setting.name || ""} // Pre-fill with existing data
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={setting.description || ""} // Pre-fill with existing data
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={setting.tags || ""} // Pre-fill with existing data
        />
        <br />
        <br />

        <label htmlFor="phone">Phone *:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          defaultValue={setting.phone || ""} // Pre-fill with existing data
        />
        <br />
        <br />

        <label htmlFor="email">Email *:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          defaultValue={setting.email || ""} // Pre-fill with existing data
        />
        <br />
        <br />

        <PrimaryBtn type="submit" text={isEditing ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default Settings;
