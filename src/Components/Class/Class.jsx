import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/ContextStore";
import BtnLoader from "../Loader/BtnLoader";

const Class = ({ cls, index, url, setClasses, classes }) => {
  const { actionLoader, setActionLoader } = useContext(StoreContext);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const deleteHandler = async (e, id) => {
    e.preventDefault();

    const confirm = window.confirm("Are you want to delete this Class?");
    if (!confirm) {
      return;
    }
    setActionLoader(true);
    setDeletingId(id);

    const response = await fetch(`${url}/classes/class/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setActionLoader(false);
    if (data.success) {
      setClasses(classes.filter((item) => item._id !== id));
      toast.success(data.message);
    }
  };
  return (
    <tr>
      <td>{index + 1} </td>
      <td> {cls.name} </td>
      <td
        onClick={() => {
          navigate("/classes/" + cls._id + "/books");
        }}
      >
        {" "}
        <button>View</button>{" "}
      </td>

      <td
        onClick={() => {
          navigate("/classes/class/edit/" + cls._id);
        }}
      >
        Edit
      </td>
      <td onClick={(e) => deleteHandler(e, cls._id)}>
        {deletingId === cls._id && actionLoader ? <BtnLoader /> : "Delete"}
      </td>
    </tr>
  );
};

export default Class;
