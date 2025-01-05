import React, { useContext, useEffect, useState } from "react";
import "./Books.css";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";
import Book from "../../Components/Book/Book";
import Loader from "../../Components/Loader/Loader";

const Books = () => {
  const { url } = useContext(StoreContext); // Assume `url` is available for API calls
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [hasFetched, setHasFetched] = useState(false); // New state variable

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${url}/books/getAllBooks`);
        const data = await response.json();
        if (data.success) {
          setLoader(false);
          const books = data.books;
          if (classId) {
            setFilteredBooks(
              books.filter((book) => book.class._id === classId)
            );
          } else {
            setFilteredBooks(books);
          }
        } else {
          console.error("Failed to fetch books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // Fetch books only if they haven't been fetched yet
    if (!hasFetched) {
      fetchBooks();
      setHasFetched(true);
    }
  }, [classId, url, hasFetched]);

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>Books</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate("/books/book/add")}
        >
          Add Book
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Book Name</th>
                <th>Class</th>
                <th>Chapters</th>
                <th>Past Papsers</th>
                <th>Guess Papsers</th>
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
              ) : filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No Book Added
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, index) => (
                  <Book
                    key={index}
                    index={index}
                    book={book}
                    filteredBooks={filteredBooks}
                    setFilteredBooks={setFilteredBooks}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
