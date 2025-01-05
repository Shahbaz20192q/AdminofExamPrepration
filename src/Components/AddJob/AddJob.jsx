import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/ContextStore";
import { toast } from "react-toastify";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import BtnLoader from "../Loader/BtnLoader";
import { useParams } from "react-router-dom";
import CkEditor from "../CkEditor/CkEditor";

const AddJob = () => {
  const { loader, url, setJobs, jobs, token } = useContext(StoreContext);
  const { jobId } = useParams();
  const [isEdit, setIsEdit] = useState(!!jobId);

  // Default state for the form
  const defaultJobState = {
    title: "",
    location: "",
    qualifications: "",
    description: "",
    tags: "",
    content: "",
    link: "",
  };

  const [job, setJob] = useState(
    isEdit
      ? jobs.find((item) => item?._id === jobId) || defaultJobState
      : defaultJobState
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const endPoint = isEdit
        ? `${url}/jobs/update/${jobId}`
        : `${url}/jobs/add`;
      const res = await fetch(endPoint, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await res.json();

      if (data.success) {
        if (isEdit) {
          setJobs((prevJobs) =>
            prevJobs.map((item) => (item._id === jobId ? data.job : item))
          );
        } else {
          setJobs((prevJobs) => [data.job, ...prevJobs]);
        }
        toast.success(data.message);
        if (!isEdit) setJob(defaultJobState); // Clear the form after adding a new job
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submit Handler Error:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  useEffect(() => {
    if (!isEdit) {
      setJob(defaultJobState); // Clear the form for Add mode
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(`${url}/jobs/job/${jobId}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.job);
        } else {
          toast.error(data.message || "Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Fetch Job Error:", error);
        toast.error("Error fetching job details.");
      }
    };

    if (!job._id) {
      fetchJob();
    }
  }, [isEdit, jobId, url]);

  return (
    <div className="add-page">
      <h3 className="heading">{isEdit ? "Update" : "Add"} a Job</h3>
      <form className="add-form" onSubmit={submitHandler}>
        <label htmlFor="title">Title *:</label>
        <input
          type="text"
          value={job.title || ""}
          onChange={changeHandler}
          id="title"
          name="title"
          required
        />
        <br />
        <br />

        <label htmlFor="location">Location *:</label>
        <input
          type="text"
          value={job.location || ""}
          onChange={changeHandler}
          id="location"
          name="location"
          required
        />
        <br />
        <br />

        <label htmlFor="qualifications">Qualifications *:</label>
        <input
          type="text"
          value={job.qualifications || ""}
          onChange={changeHandler}
          id="qualifications"
          name="qualifications"
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          value={job.description || ""}
          onChange={changeHandler}
          id="description"
          name="description"
        />
        <br />
        <br />

        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          value={job.tags || ""}
          onChange={changeHandler}
          id="tags"
          name="tags"
        />
        <br />
        <br />

        <label htmlFor="link">Link:</label>
        <input
          value={job.link || ""}
          onChange={changeHandler}
          id="link"
          name="link"
        />
        <br />
        <br />

        <label htmlFor="content">Content:</label>
        <CkEditor
          value={job.content || ""}
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

export default AddJob;
