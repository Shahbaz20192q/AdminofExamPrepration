import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../Context/ContextStore";
import Loader from "../../Components/Loader/Loader";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Ebooks = () => {
  const { url, loader, seteBooks, fetchEBooks, eBooks, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (eBooks.length === 0) {
      fetchEBooks();
    }
  }, []);

  // Delete
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this ebook?"
    );
    if (confirm) {
      fetch(`${url}/eBooks/deleteEbook/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      seteBooks(eBooks.filter((ebook) => ebook._id !== id));
      toast.success("Ebook deleted successfully");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>E-Books</h2>
        <button className="primaryBtn" onClick={() => navigate("/ebooks/add")}>
          Add Book
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title Name</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="5">
                    <Loader />
                  </th>
                </tr>
              ) : eBooks?.length == 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No E-Books Added
                  </td>
                </tr>
              ) : (
                eBooks?.map((book, index) => (
                  <tr>
                    <td> {index + 1} </td>
                    <td> {book.title} </td>
                    <td> {book.category} </td>
                    <td onClick={() => navigate(`/ebooks/${book._id}/edit`)}>
                      {" "}
                      <button>Edit</button>
                    </td>
                    <td onClick={() => handleDelete(book._id)}>
                      {" "}
                      <button>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ebooks;
