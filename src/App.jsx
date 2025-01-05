import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Classes from "./Pages/Classes/Classes.jsx";
import { ToastContainer } from "react-toastify";
import AddPage from "./Components/AddPage/AddPage.jsx";
import EditPage from "./Components/EditPage/EditPage.jsx";
import Books from "./Pages/Books/Books.jsx";
import AddBook from "./Components/AddBook/AddBook.jsx";
import Chaptars from "./Components/Chaptars/Chaptars.jsx";
import Chaptar from "./Components/Chaptar/Chaptar.jsx";
import MCQs from "./Components/MCQs/MCQs.jsx";
import MCQ from "./Components/MCQ/MCQ.jsx";
import Shorts from "./Components/Shorts/Shorts.jsx";
import ShortAdd from "./Components/ShortAdd/ShortAdd.jsx";
import Users from "./Pages/Users/Users.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import CheckAuth from "./Pages/Auth/CheckAuth.jsx";
import MEH from "./Pages/MEH/MEH.jsx";
import PastPapers from "./Components/PastPapers/PastPapers.jsx";
import AddPastPaper from "./Components/AddPastPaper/AddPastPaper.jsx";
import GuessPapers from "./Components/GuessPapers/GuessPapers.jsx";
import AddGuessPaper from "./Components/AddGuessPaper/AddGuessPaper.jsx";
import News from "./Pages/News/News.jsx";
import AddNews from "./Components/AddNews/AddNews.jsx";
import Jobs from "./Pages/Jobs/Jobs.jsx";
import AddJob from "./Components/AddJob/AddJob.jsx";
import Ebooks from "./Pages/Ebooks/Ebooks.jsx";
import AddEBook from "./Components/AddEBook/AddEBook.jsx";
import ChapterTests from "./Components/ChapterTests/ChapterTests.jsx";
import AddChapterTest from "./Components/AddChapterTest/AddChapterTest.jsx";

const App = () => {
  return (
    <>
      <CheckAuth />
      <ToastContainer />
      <Header />

      {/* Set the page title dynamically with react-helmet */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>Home - My App</title>
              </Helmet>
              <Home />
            </>
          }
        />
        <Route
          path="/classes"
          element={
            <>
              <Helmet>
                <title>Classes - My App</title>
              </Helmet>
              <Classes />
            </>
          }
        />

        <Route
          path="/classes/:classId/books"
          element={
            <>
              <Helmet>
                <title>Books - My App</title>
              </Helmet>
              <Books />
            </>
          }
        />
        <Route
          path="/classes/class/add"
          element={
            <>
              <Helmet>
                <title>Add Class - My App</title>
              </Helmet>
              <AddPage />
            </>
          }
        />
        <Route
          path="/classes/class/edit/:id"
          element={
            <>
              <Helmet>
                <title>Edit Class - My App</title>
              </Helmet>
              <EditPage />
            </>
          }
        />
        <Route
          path="/books"
          element={
            <>
              <Helmet>
                <title>Books - My App</title>
              </Helmet>
              <Books />
            </>
          }
        />
        <Route
          path="/books/book/add"
          element={
            <>
              <Helmet>
                <title>Add Book - My App</title>
              </Helmet>
              <AddBook />
            </>
          }
        />
        <Route
          path="/books/book/edit/:id"
          element={
            <>
              <Helmet>
                <title>Edit Book - My App</title>
              </Helmet>
              <AddBook />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars"
          element={
            <>
              <Helmet>
                <title>Chapters - My App</title>
              </Helmet>
              <Chaptars />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/add"
          element={
            <>
              <Helmet>
                <title>Add Chapter - My App</title>
              </Helmet>
              <Chaptar />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/edit"
          element={
            <>
              <Helmet>
                <title>Edit Chapter - My App</title>
              </Helmet>
              <Chaptar />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/mcqs"
          element={
            <>
              <Helmet>
                <title>MCQs - My App</title>
              </Helmet>
              <MCQs />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/mcqs/add"
          element={
            <>
              <Helmet>
                <title>Add MCQs - My App</title>
              </Helmet>
              <MCQ />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/short"
          element={
            <>
              <Helmet>
                <title>Shorts - My App</title>
              </Helmet>
              <Shorts />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/short/add"
          element={
            <>
              <Helmet>
                <title>Add Short - My App</title>
              </Helmet>
              <ShortAdd />
            </>
          }
        />
        <Route
          path="/books/book/:bookId/chaptars/:chapterId/short/:shortId/edit"
          element={
            <>
              <Helmet>
                <title>Add Short - My App</title>
              </Helmet>
              <ShortAdd />
            </>
          }
        />

        <Route
          path="/books/book/:bookId/chaptars/:chapterId/test"
          element={
            <>
              <Helmet>
                <title>Chapter Test - My App</title>
              </Helmet>
              <ChapterTests />
            </>
          }
        />

        <Route
          path="/books/book/:bookId/chaptars/:chapterId/test/add"
          element={
            <>
              <Helmet>
                <title>Add Chapter Test - My App</title>
              </Helmet>
              <AddChapterTest />
            </>
          }
        />

        <Route
          path="/books/book/:bookId/chaptars/:chapterId/test/:testId/edit"
          element={
            <>
              <Helmet>
                <title>Edit Chapter Test - My App</title>
              </Helmet>
              <AddChapterTest />
            </>
          }
        />

        {/* {MEH} */}

        <Route
          path="/meh"
          element={
            <>
              <Helmet>
                <title>MEH</title>
              </Helmet>
              <MEH />
            </>
          }
        />

        <Route
          path="/meh/chapter/add"
          element={
            <>
              <Helmet>
                <title>MEH</title>
              </Helmet>
              <Chaptar />
            </>
          }
        />

        <Route
          path="/meh/:chapterId/mcqs"
          element={
            <>
              <Helmet>
                <title>MEH MCQs</title>
              </Helmet>
              <MCQs />
            </>
          }
        />

        <Route
          path="/meh/:chapterId/mcqs/add"
          element={
            <>
              <Helmet>
                <title>Add MEH MCQ</title>
              </Helmet>
              <MCQ />
            </>
          }
        />

        {/* GK */}

        <Route
          path="/gk"
          element={
            <>
              <Helmet>
                <title>General Knoledge</title>
              </Helmet>
              <Chaptars />
            </>
          }
        />

        <Route
          path="/gk/:otherBook/mcqs"
          element={
            <>
              <Helmet>
                <title>MCQs of GK</title>
              </Helmet>
              <MCQs />
            </>
          }
        />

        <Route
          path="/gk/:otherBook/mcqs/add"
          element={
            <>
              <Helmet>
                <title>MCQs of GK</title>
              </Helmet>
              <MCQ />
            </>
          }
        />

        <Route
          path="/gk/:otherBook/shorts"
          element={
            <>
              <Helmet>
                <title>Short Questions of GK</title>
              </Helmet>
              <Shorts />
            </>
          }
        />
        <Route
          path="/gk/:otherBook/shorts/add"
          element={
            <>
              <Helmet>
                <title>Add Short Questions of GK</title>
              </Helmet>
              <ShortAdd />
            </>
          }
        />

        {/* Papst Papers */}
        <Route
          path="/pastPapers/:bookId"
          element={
            <>
              <Helmet>
                <title>Past Papers</title>
              </Helmet>
              <PastPapers />
            </>
          }
        />

        <Route
          path="/pastPapers/:bookId/add"
          element={
            <>
              <Helmet>
                <title>Add Past Papers</title>
              </Helmet>
              <AddPastPaper />
            </>
          }
        />

        <Route
          path="/pastPapers/:bookId/:paperId/edit"
          element={
            <>
              <Helmet>
                <title>Edit Past Papers</title>
              </Helmet>
              <AddPastPaper />
            </>
          }
        />

        {/* guess Papers */}
        <Route
          path="/guessPapers/:bookId"
          element={
            <>
              <Helmet>
                <title>Guess Papers</title>
              </Helmet>
              <GuessPapers />
            </>
          }
        />

        <Route
          path="/guessPapers/:bookId/add"
          element={
            <>
              <Helmet>
                <title> Add Guess Papers</title>
              </Helmet>
              <AddGuessPaper />
            </>
          }
        />

        <Route
          path="/guessPapers/:bookId/:paperId/edit"
          element={
            <>
              <Helmet>
                <title> Add Guess Papers</title>
              </Helmet>
              <AddGuessPaper />
            </>
          }
        />

        {/* News */}

        <Route
          path="/informationalNews"
          element={
            <>
              <Helmet>
                <title> Informational News</title>
              </Helmet>
              <News />
            </>
          }
        />

        <Route
          path="/informationalNews/add"
          element={
            <>
              <Helmet>
                <title> Informational News</title>
              </Helmet>
              <AddNews />
            </>
          }
        />

        <Route
          path="/informationalNews/:newsId/edit"
          element={
            <>
              <Helmet>
                <title> Edit Informational News</title>
              </Helmet>
              <AddNews />
            </>
          }
        />

        {/* Jobs */}

        <Route
          path="/jobs"
          element={
            <>
              <Helmet>
                <title>Jobs</title>
              </Helmet>
              <Jobs />
            </>
          }
        />

        <Route
          path="/jobs/add"
          element={
            <>
              <Helmet>
                <title>Add Jobs</title>
              </Helmet>
              <AddJob />
            </>
          }
        />

        <Route
          path="/jobs/:jobId/edit"
          element={
            <>
              <Helmet>
                <title>Edit Jobs</title>
              </Helmet>
              <AddJob />
            </>
          }
        />

        {/* E-books */}
        <Route
          path="/ebooks"
          element={
            <>
              <Helmet>
                <title>E-Books - My App</title>
              </Helmet>
              <Ebooks />
            </>
          }
        />

        <Route
          path="/ebooks/add"
          element={
            <>
              <Helmet>
                <title>Add E-Books - My App</title>
              </Helmet>
              <AddEBook />
            </>
          }
        />

        <Route
          path="/ebooks/:id/edit"
          element={
            <>
              <Helmet>
                <title>Edit E-Books - My App</title>
              </Helmet>
              <AddEBook />
            </>
          }
        />

        {/* users */}

        <Route
          path="/users"
          element={
            <>
              <Helmet>
                <title>Users - My App</title>
              </Helmet>
              <Users />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Helmet>
                <title>Settings - My App</title>
              </Helmet>
              <Settings />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Helmet>
                <title>Login - My App</title>
              </Helmet>
              <Auth />
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
