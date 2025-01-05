import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import BtnLoader from "../Loader/BtnLoader";
import { useParams } from "react-router-dom";
import CkEditor from "../CkEditor/CkEditor";

const AddNews = () => {
  const { loader, url, setNews, news, token } = useContext(StoreContext);
  const { newsId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [oneNews, setOneNews] = useState(
    news.find((allNews) => allNews._id === newsId) || {}
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setOneNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const endPoint = isEdit
        ? `${url}/blogs/update/${newsId}`
        : `${url}/blogs/add`;
      const res = await fetch(endPoint, {
        method: isEdit ? "PUT" : "POST",
        body: formData,
        encType: "multipart/form-data",
        headers: {
          authorization: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        e.target.reset();
        isEdit
          ? setNews((prevNews) =>
              prevNews.map((item) => (item._id === newsId ? data.blog : item))
            )
          : setNews((pNews) => [data.blog, ...pNews]);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during submit form");
    }
  };

  useEffect(() => {
    if (newsId) {
      setIsEdit(true);
    }
  }, [isEdit]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`${url}/blogs/blog/${newsId}`);
      const data = await res.json();
      if (data.success) {
        setOneNews(data.blog);
      }
    };
    if (!oneNews._id) {
      fetchNews();
    }
  }, [newsId]);

  return (
    <div className="add-page">
      <h3 className="heading"> {isEdit ? "Update" : "Add"} a News</h3>
      <form
        className="add-form"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label htmlFor="image">Image *:</label>
        <input
          type="file"
          id="image"
          name="image"
          required={isEdit ? false : true}
        />
        <br />
        <br />

        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          value={oneNews.title}
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
          value={oneNews.description}
          onChange={changeHandler}
          id="description"
          name="description"
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          value={oneNews.tags}
          onChange={changeHandler}
          id="tags"
          name="tags"
        />
        <br />
        <br />

        <label htmlFor="content">Content:</label>
        <CkEditor
          value={oneNews.content}
          onChange={changeHandler}
          id="content"
          name="content"
        />
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

export default AddNews;
