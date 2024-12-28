import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const Users = () => {
  const { url, loader, setLoader } = useContext(StoreContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const deleteHandler = (id) => {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (confirm) {
      fetch(`${url}/users/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("User deleted successfully");
            setUsers(users.filter((user) => user._id !== id));
          } else {
            toast.error("Failed to delete user");
          }
        });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoader(true);
      const res = await fetch(`${url}/users/alluser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setLoader(false);
        setUsers(data.users);
      } else {
        setLoader(false);
        toast.error(data.error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>Users</h2>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <th colSpan="4">
                    <Loader />
                  </th>
                </tr>
              ) : users.length == 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No user Register
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {user.username} </td>
                    <td> {user.email} </td>
                    <td
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                    >
                      {" "}
                      <button>Delete</button>{" "}
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

export default Users;
