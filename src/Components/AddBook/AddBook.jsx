import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BtnLoader from "../Loader/BtnLoader";

const AddBook = () => {
  const { id } = useParams();
  const { classes, url, setBooks, books, loader, setLoader, token } =
    useContext(StoreContext);
  const [isEdit, setIsEdit] = useState(false);
  const [book, setBook] = useState({
    title: "",
    description: "",
    tags: "",
    author: "",
    classId: "",
  });

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const foundBook = books.find((book) => book._id === id);
      if (foundBook) {
        setBook({
          title: foundBook.title,
          description: foundBook.description,
          tags: foundBook.tags,
          author: foundBook.author,
          class: foundBook.class || "",
        });
      }
    }
  }, [id, books]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const res = await fetch(
        `${url}/books/${isEdit ? "updateBook/" + id : "addBook"}`,
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      const data = await res.json();
      setLoader(false);
      if (data.success) {
        if (isEdit) {
          setBooks((preBooks) =>
            preBooks.map((b) => (b._id === id ? data.book : b))
          );
          toast.success(data.message);
        } else {
          e.target.reset();
          setBooks((preBooks) => [...preBooks, data.book]);
          toast.success(data.message);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during adding/updating book.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <div className="add-page">
      <h3 className="heading"> {isEdit ? "Edit" : "Add"} a Book</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          value={book.title}
          id="title"
          name="title"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          value={book.description}
          id="description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          value={book.tags}
          id="tags"
          name="tags"
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          value={book.author}
          id="author"
          name="author"
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="class">Select Class *:</label>
        <select
          id="class"
          name="classId"
          value={book.classId}
          onChange={handleChange}
          required
        >
          {isEdit ? (
            <option value={book.classId}> {book.class?.name} </option>
          ) : (
            <option value="">Please choose a class</option>
          )}
          {classes
            .filter((cls) => cls._id !== book.class?._id)
            .map((cls) => (
              <option key={cls._id} value={cls._id}>
                {" "}
                {cls.name}{" "}
              </option>
            ))}
        </select>
        <br />
        <br />

        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : isEdit ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default AddBook;
