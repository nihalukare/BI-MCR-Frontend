import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { BASE_API_URL } from "../config";

export default function JobDetails() {
  const params = useParams();

  const { data, loading, error } = useFetch(`${BASE_API_URL}/job/${params.id}`);

  const job = data?.data;

  return (
    <>
      <Header />
      <main className="container">
        <section className="mt-3">
          <h2 className="mb-3">
            {job ? job.title : loading ? "Loading..." : error ? "Error!" : ""}
          </h2>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                <span className="fw-medium">Company Name:</span>{" "}
                {job
                  ? job.companyName
                  : loading
                  ? "Loading..."
                  : error
                  ? "Error!"
                  : ""}
              </p>
              <p className="card-text">
                <span className="fw-medium">Location:</span>{" "}
                {job
                  ? job.location
                  : loading
                  ? "Loading..."
                  : error
                  ? "Error!"
                  : ""}
              </p>
              <p className="card-text">
                <span className="fw-medium">Salary:</span>{" "}
                {job
                  ? job.salary
                  : loading
                  ? "Loading..."
                  : error
                  ? "Error!"
                  : ""}
              </p>
              <p className="card-text">
                <span className="fw-medium">Job Tpye:</span>{" "}
                {job
                  ? job.jobType
                  : loading
                  ? "Loading..."
                  : error
                  ? "Error"
                  : ""}
              </p>
              <p className="card-text">
                <span className="fw-medium">Description:</span>{" "}
                {job
                  ? job.jobDescription
                  : loading
                  ? "Loading"
                  : error
                  ? "Error"
                  : ""}
              </p>
              <p className="card-text m-0">
                <span className="fw-medium">Qualifications:</span>
              </p>
              <ol>
                {job
                  ? job.jobQualifications.map((qualification, index) => (
                      <li key={index}>{qualification}</li>
                    ))
                  : loading
                  ? "Loading..."
                  : error
                  ? "Error!"
                  : ""}
              </ol>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
