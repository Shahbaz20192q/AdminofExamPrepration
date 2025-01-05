import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const GuessPapers = () => {
  const navigate = useNavigate();
  const {
    loader,
    books,
    getGuessPapers,
    guessPapers,
    setGuessPapers,
    url,
    token,
  } = useContext(StoreContext);
  const { bookId } = useParams();
  const book = books.find((book) => book._id === bookId);

  // Use a ref to ensure `getGuessPapers` is only called once for a specific bookId
  const fetchedRef = React.useRef(false);

  useEffect(() => {
    if (book?._id && !fetchedRef.current) {
      getGuessPapers(book._id);
      fetchedRef.current = true; // Prevent multiple fetch calls
    }
  }, [book?._id]);

  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this paper?");
    if (!confirm) {
      return;
    }
    try {
      const res = await fetch(`${url}/guessPapers/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setGuessPapers(
          guessPapers.filter((previousPaper) => previousPaper._id !== id)
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during deleting guess paper. Try again.");
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>{book?.title}</h2>
        <h2>Guess Papers</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate(`/guessPapers/${book._id}/add`)}
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
              ) : guessPapers.length === 0 ? (
                <tr>
                  <th colSpan="6">
                    <p>No guess papers added</p>
                  </th>
                </tr>
              ) : (
                guessPapers.map((paper, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{paper.title}</td>
                    <td>{paper.book.title}</td>
                    <td>{paper.year}</td>
                    <td
                      onClick={() =>
                        navigate(`/guessPapers/${bookId}/${paper._id}/edit`)
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

export default GuessPapers;
