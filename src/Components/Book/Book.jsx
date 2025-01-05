import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import BtnLoader from "../Loader/BtnLoader";

const Book = ({ book, index, setFilteredBooks, filteredBooks }) => {
  const { url, actionLoader, setActionLoader, token } =
    useContext(StoreContext);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this books?");
    if (!confirm) {
      return;
    }
    setDeletingId(id);
    setActionLoader(true);
    try {
      const res = await fetch(`${url}/books/deleteBook/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      setActionLoader(false);
      if (data.success) {
        setFilteredBooks(filteredBooks.filter((book) => book._id !== id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <tr>
      <td> {index + 1} </td>
      <td> {book.title} </td>
      <td> {book.class.name} </td>
      <td
        onClick={() => {
          navigate("/books/book/" + book._id + "/chaptars");
        }}
      >
        <button>view</button>
      </td>
      <td
        onClick={() => {
          navigate("/pastPapers/" + book._id);
        }}
      >
        {" "}
        <button>View</button>{" "}
      </td>
      <td onClick={() => navigate(`/guessPapers/${book._id}`)}>
        {" "}
        <button>View</button>{" "}
      </td>
      <td
        onClick={() => {
          navigate("/books/book/edit/" + book._id);
        }}
      >
        <button>Edit</button>
      </td>
      <td onClick={() => deleteHandler(book._id)}>
        {" "}
        <button>
          {" "}
          {book._id === deletingId && actionLoader ? (
            <BtnLoader />
          ) : (
            "Delete"
          )}{" "}
        </button>{" "}
      </td>
    </tr>
  );
};

export default Book;
