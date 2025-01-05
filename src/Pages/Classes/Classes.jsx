import React, { useContext } from "react";
import "./Classes.css";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import Class from "../../Components/Class/Class";
import { StoreContext } from "../../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const Classes = () => {
  const { classes, setClasses, url, loader, setLoader } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>Classes</h2>
        <button
          className="primaryBtn"
          onClick={() => navigate("/classes/class/add")}
        >
          Add Class
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>class Name</th>
                <th>Books</th>
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
              ) : classes.length == 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Class Added
                  </td>
                </tr>
              ) : (
                classes.map((cls, index) => (
                  <Class
                    key={index}
                    setClasses={setClasses}
                    classes={classes}
                    url={url}
                    cls={cls}
                    index={index}
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

export default Classes;
