import React, { useContext, useEffect, useState } from "react";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import { useParams, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import BtnLoader from "../Loader/BtnLoader";

const Chaptar = () => {
  const { url, loader, setLoader, token } = useContext(StoreContext);
  const { bookId, chapterId } = useParams(); // Assuming chapterId is passed in the URL for updates
  const location = useLocation();
  const cpath = location.pathname;
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    tags: "",
    otherBook: "",
  });

  useEffect(() => {
    // Fetch chapter data if chapterId is present
    if (chapterId) {
      const fetchChapterData = async () => {
        try {
          const res = await fetch(`${url}/chapters/chapter/${chapterId}`);
          const data = await res.json();
          if (data.success) {
            setChapterData(data.chapter);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error("Error fetching chapter data.");
        }
      };
      fetchChapterData();
    }
  }, [chapterId, url]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());

    try {
      const endPoint =
        cpath === "/meh/chapter/add"
          ? `${url}/meh/chapter`
          : `${url}/chapters/${
              chapterId ? "updateChapter/" + chapterId : "addChapter"
            }`;
      const res = await fetch(endPoint, {
        method: chapterId ? "PUT" : "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      setLoader(false);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during chapter submission.");
    }
  };

  return (
    <div className="add-page">
      <h3 className="heading">
        {chapterId ? "Update Chapter" : "Add a Chapter"}
      </h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={chapterData?.title}
          onChange={(e) =>
            setChapterData({ ...chapterData, title: e.target.value })
          }
          required
        />
        <br />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={chapterData?.description}
          onChange={(e) =>
            setChapterData({ ...chapterData, description: e.target.value })
          }
        />
        <br />
        <br />
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={chapterData?.tags}
          onChange={(e) =>
            setChapterData({ ...chapterData, tags: e.target.value })
          }
        />
        <br />
        <br />
        <input type="hidden" name="bookId" value={bookId} />
        <input type="hidden" name="chapterId" value={chapterId} />{" "}
        {cpath === "/meh/chapter/add" ? (
          <input type="hidden" name="otherBook" value="moavineen-e-Hajj" />
        ) : (
          <></>
        )}
        {/* Optional, if you want to send chapterId */}
        <PrimaryBtn
          type="submit"
          text={loader ? <BtnLoader /> : chapterId ? "Update" : "Add"}
        />
      </form>
    </div>
  );
};

export default Chaptar;
