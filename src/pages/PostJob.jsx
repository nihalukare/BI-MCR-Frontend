import { useState } from "react";
import Header from "../components/Header";
import { BASE_API_URL } from "../config";
import { useToasts } from "../context/ToastContext";
import Toast from "../components/Toast";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredQualifications, setRequiredQualifications] = useState("");

  const { showToast } = useToasts();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = document.querySelector(".needs-validation");
    if (form && !form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const formData = {
      title: jobTitle,
      companyName: companyName,
      location: location,
      salary: salary,
      jobType: jobType,
      jobDescription: jobDescription,
      jobQualifications: requiredQualifications.split("\n"),
    };

    try {
      const res = await fetch(`${BASE_API_URL}/job`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save new job data.");
      } else {
        setJobTitle("");
        setCompanyName("");
        setLocation("");
        setSalary("");
        setJobType("");
        setJobDescription("");
        setRequiredQualifications([]);

        const form = document.querySelector(".needs-validation");
        if (form) {
          form.classList.remove("was-validated");
        }
      }
      const data = await res.json();
      showToast(data.message, "success");
    } catch (error) {
      console.log(error);
      showToast(error, "danger");
    }
  }

  return (
    <>
      <Header />
      <Toast />
      <main className="container">
        <section>
          <h2>Post a Job</h2>
          {/* Form to Post Job */}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="titleInput" className="form-label fw-medium">
                Job Title:
              </label>
              <input
                type="text"
                id="titleInput"
                className="form-control"
                placeholder="E.g. Cloud Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter a job title.</div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="companyNameInput"
                className="form-label fw-medium"
              >
                Company Name:
              </label>
              <input
                type="text"
                id="companyNameInput"
                className="form-control"
                placeholder="E.g. HCL Technologies"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter company name.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="locationInput" className="form-label fw-medium">
                Location:
              </label>
              <input
                type="text"
                id="locationInput"
                className="form-control"
                placeholder="E.g. Pune, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter job location.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="salaryInput" className="form-label fw-medium">
                Salary:
              </label>
              <input
                type="text"
                id="salaryInput"
                className="form-control"
                placeholder="E.g. 450000"
                value={salary}
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d+$/.test(value)) {
                    setSalary(value);
                  }
                }}
                required
              />
              <div className="invalid-feedback">Please enter job salary.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="jobTypeInput" className="form-label fw-medium">
                Job Type:
              </label>
              <select
                id="jobTypeInput"
                className="form-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Click to Select --
                </option>
                <option value="Full-time (On-site)">Full-time (On-site)</option>
                <option value="Part-time (On-site)">Part-time (On-site)</option>
                <option value="Full-time (Remote)">Full-time (Remote)</option>
                <option value="Part-time (Remote)">Part-time (Remote)</option>
              </select>
              <div className="invalid-feedback">Please select a job type.</div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="jobDescriptionInput"
                className="form-label fw-medium"
              >
                Job Description:
              </label>
              <textarea
                id="jobDescriptionInput"
                className="form-control"
                placeholder="Provide a Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>
              <div className="invalid-feedback">
                Please enter job description.
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="jobQualifications"
                className="form-label fw-medium"
              >
                Job Qualifications:
              </label>
              <textarea
                id="jobQualifications"
                className="form-control"
                placeholder="Provide Job qualifications one below another."
                value={requiredQualifications}
                onChange={(e) => setRequiredQualifications(e.target.value)}
                required
              ></textarea>
              <div className="invalid-feedback">
                Please enter job qualifications.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Post Job
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
