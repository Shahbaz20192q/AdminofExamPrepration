import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import "./News.css";
import { toast } from "react-toastify";
import BtnLoader from "../../Components/Loader/BtnLoader";

const News = () => {
  const {
    url,
    loader,
    getNews,
    news,
    setNews,
    hasMore,
    page,
    setPage,
    setActionLoader,
    actionLoader,
    token,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch only the first page if news is empty
    if (news.length === 0 && page === 1) {
      getNews(1);
    }
  }, []); // Runs only on initial mount

  const loadMore = () => {
    setActionLoader(true);
    const nextPage = page + 1;
    setPage(nextPage);
    getNews(nextPage);
  };

  // Delete handler
  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this news?");
    if (!confirm) {
      return;
    }
    const res = await fetch(`${url}/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await res.json();
    if (data.success) {
      setNews(news.filter((pnews) => pnews._id !== id));
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>News</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate("/informationalNews/add")}
        >
          Add News
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="8">
                    <Loader />
                  </th>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No News added
                  </td>
                </tr>
              ) : (
                news.map((n, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="image-td">
                      <img
                        src={`${url}/blogs/image/${n.image}`}
                        alt={n.title}
                      />
                    </td>
                    <td>{n.title}</td>
                    <td
                      onClick={() =>
                        navigate(`/informationalNews/${n._id}/edit`)
                      }
                    >
                      <button>Edit</button>
                    </td>
                    <td onClick={() => deleteHandler(n._id)}>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {hasMore && (
        <button className="primaryBtn" onClick={loadMore}>
          {actionLoader ? <BtnLoader /> : "Load More"}
        </button>
      )}
    </div>
  );
};

export default News;
