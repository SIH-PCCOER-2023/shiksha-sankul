import React, { useState } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const TestScoreFetcher = ({ onSuccess }) => {
  const [studentId, setStudentId] = useState("");

  const fetchTestScores = async (studentId) => {
    try {
      const res = await sendGetRequest(
        `http://localhost:8080/api/v1/student/array/${studentId}`
      );
      if (res && res.data && res.data.status === "success") {
        const data = res.data.data;
        const fetchedScores = data.map((score) => score.obtainedScore);
        onSuccess(fetchedScores); // Call the callback function with obtained scores only
      } else {
        showAlert("error", "Failed to fetch test scores.");
      }
    } catch (err) {
      showAlert(
        "error",
        err.response
          ? err.response.data.message
          : "An error occurred while fetching test scores."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTestScores(studentId);
  };

  return (
    <div className="test-score-fetcher">
      <h2>Test Score Fetcher</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Fetch Scores</button>
      </form>
    </div>
  );
};

export default TestScoreFetcher;
