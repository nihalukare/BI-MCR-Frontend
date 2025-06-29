import { Link } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

import { useToasts } from "../context/ToastContext";

import Toast from "../components/Toast";
import { useState } from "react";

export default function Home() {
  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useFetch(`${BASE_API_URL}/job`);

  const { showToast } = useToasts();

  const [searchValue, setSeachValue] = useState("");

  let filteredJobs = jobsData?.data;

  // Search Input
  if (searchValue.trim()) {
    filteredJobs = filteredJobs?.filter((job) =>
      job.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      const res = await fetch(`${BASE_API_URL}/job/${id}`, {
        method: "delete",
      });

      if (!res.ok) {
        throw new Error("Failed to delete job.");
      }

      const data = await res.json();

      showToast(data.message, "info");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <Header />
      {/* <Toast /> */}
      <Toast />

      <main className="container">
        {/* Search Input */}
        <section className="my-3">
          <div className="col-md-6">
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Search by job title..."
              value={searchValue}
              onChange={(e) => setSeachValue(e.target.value)}
            />
          </div>
        </section>

        {/* All Filtered Jobs Display */}
        <section>
          <h2>All filteredJobs</h2>
          <div className="row">
            {jobsLoading && (
              <div className="alert alert-info fw-medium">Loading....</div>
            )}
            {filteredJobs &&
              filteredJobs.map((job, index) => (
                <div key={index} className="col-md-4 mb-2">
                  <div className="card p-3">
                    <div className="card-body">
                      <h5 className="card-title">{job.title}</h5>
                      <p className="card-text">
                        <span className="fw-medium">Company name:</span>{" "}
                        {job.companyName}
                      </p>
                      <p className="card-text">
                        <span className="fw-medium">Location:</span>{" "}
                        {job.location}
                      </p>
                      <p className="card-text">
                        <span className="fw-medium">Job Type:</span>{" "}
                        {job.jobType}
                      </p>
                      <div className="d-flex gap-2">
                        <Link
                          to={`jobDetails/${job._id}`}
                          type="button"
                          className="btn btn-primary col-md-5 px-4"
                        >
                          See Details
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger col-md-5 px-4"
                          onClick={() => {
                            handleDelete(job._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
