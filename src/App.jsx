import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postJob" element={<PostJob />} />
          <Route path="/jobDetails/:id" element={<JobDetails />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
