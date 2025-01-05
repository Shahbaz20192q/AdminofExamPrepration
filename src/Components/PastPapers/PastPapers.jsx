import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const PastPapers = () => {
  const navigate = useNavigate();
  const {
    loader,
    books,
    getPastPapers,
    pastPapers,
    setPastPapers,
    url,
    token,
  } = useContext(StoreContext);
  const { bookId } = useParams();
  const book = books.find((book) => book._id === bookId);

  // Use a ref to track if the fetch request has been sent for the current bookId
  const fetchedRef = React.useRef(false);

  useEffect(() => {
    if (book?._id && !fetchedRef.current) {
      getPastPapers(book._id);
      fetchedRef.current = true; // Mark fetch as done for this bookId
    }
  }, [book?._id]); // Only depend on bookId to prevent multiple fetches

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this paper?");
    if (!confirm) {
      return;
    }
    try {
      const res = await fetch(`${url}/pastPapers/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setPastPapers(
          pastPapers.filter((previousPapers) => previousPapers._id !== id)
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during deleting past paper. Try again.");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>{book?.title}</h2>
        <h2>Past Papers</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate(`/pastPapers/${book._id}/add`)}
        >
          Add Paper
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Book</th>
                <th>Year</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <td colSpan="6">
                    <Loader />
                  </td>
                </tr>
              ) : pastPapers.length === 0 ? (
                <tr>
                  <th colSpan="6">
                    <p>No past papers added</p>
                  </th>
                </tr>
              ) : (
                pastPapers.map((paper, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{paper.title}</td>
                    <td>{paper.book.title}</td>
                    <td>{paper.year}</td>
                    <td
                      onClick={() =>
                        navigate(`/pastpapers/${bookId}/${paper._id}/edit`)
                      }
                    >
                      <button>Edit</button>
                    </td>
                    <td onClick={() => deleteHandler(paper._id)}>
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

export default PastPapers;
