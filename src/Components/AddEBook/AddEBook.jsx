import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BtnLoader from "../Loader/BtnLoader";
import CkEditor from "../CkEditor/CkEditor";

const AddEBook = () => {
  const { id } = useParams();
  const { url, seteBooks, eBooks, loader, setLoader, token } =
    useContext(StoreContext);

  const [isEdit, setIsEdit] = useState(false);
  const [book, setBook] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    link: "",
    content: "",
    image: null,
  });

  const fetchEbook = async () => {
    try {
      const response = await fetch(`${url}/eBooks/getEbook/${id}`);
      const data = await response.json();
      setBook(data.eBook);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the book details if in edit mode
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const foundBook = eBooks.find((book) => book._id === id);

      if (foundBook) {
        setBook({
          title: foundBook.title || "",
          description: foundBook.description || "",
          category: foundBook.category || "",
          tags: foundBook.tags || "",
          link: foundBook.link || "",
          content: foundBook.content || "",
          image: foundBook.image || null,
        });
      } else {
        fetchEbook();
      }
    } else {
      setIsEdit(false);
      setBook({
        title: "",
        description: "",
        category: "",
        tags: "",
        link: "",
        content: "",
        image: null,
      });
    }
  }, [id, eBooks]);

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("category", book.category);
    formData.append("tags", book.tags);
    formData.append("link", book.link);
    formData.append("content", book.content);
    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      const response = await fetch(
        `${url}/eBooks/${isEdit ? `updateEbook/${id}` : "addEbook"}`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            authorization: token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setLoader(false);

      if (data.success) {
        toast.success(data.message);

        if (isEdit) {
          seteBooks((prevBooks) =>
            prevBooks.map((b) => (b?._id === id ? data.eBook : b))
          );
        } else {
          seteBooks((prevBooks) => [data.eBook, ...prevBooks]);
          setBook({
            title: "",
            description: "",
            category: "",
            tags: "",
            link: "",
            content: "",
            image: null,
          });
          e.target.reset();
        }
      } else {
        toast.error(data.message || "Failed to process request.");
      }
    } catch (error) {
      setLoader(false);
      toast.error("An error occurred while processing the request.");
    }
  };

  // Update form state on input change
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setBook((prevBook) => ({ ...prevBook, image: e.target.files[0] }));
    } else {
      const { name, value } = e.target;
      setBook((prevBook) => ({ ...prevBook, [name]: value }));
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">{isEdit ? "Edit" : "Add"} a Book</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="image">Image *:</label>
          <input type="file" id="image" name="image" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *:</label>
          <input
            type="text"
            value={book.title}
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            value={book.description}
            id="description"
            name="description"
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            value={book.category}
            id="category"
            name="category"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            value={book.tags}
            id="tags"
            name="tags"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            value={book.link}
            id="link"
            name="link"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <CkEditor
            id="content"
            name="content"
            onChange={handleChange}
            value={book?.content}
          />
        </div>

        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : isEdit ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default AddEBook;
