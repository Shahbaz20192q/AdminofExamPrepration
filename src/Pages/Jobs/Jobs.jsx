import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const Jobs = () => {
  const { url, loader, getJobs, jobs, setJobs, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobs.length == 0) {
      getJobs();
    }
  }, []);

  //   Delete handler
  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure to delete this news?");
    if (!confirm) {
      return;
    }
    const res = await fetch(`${url}/jobs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await res.json();
    if (data.success) {
      setJobs(jobs.filter((pjobs) => pjobs._id !== id));
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="classes-wrepper">
      <div className="header-box">
        <h2>News</h2>
        <button className="primaryBtn" onClick={() => navigate("/jobs/add")}>
          Add Job
        </button>
      </div>
      <div className="classes">
        <div className="class">
          <table>
            <thead>
              <tr>
                <th>No</th>
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
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No Job added
                  </td>
                </tr>
              ) : (
                jobs.map((job, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>

                    <td> {job.title} </td>
                    <td onClick={() => navigate(`/jobs/${job._id}/edit`)}>
                      {" "}
                      <button>Edit</button>{" "}
                    </td>
                    <td onClick={() => deleteHandler(job._id)}>
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

export default Jobs;
