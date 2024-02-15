// TestScoreFetcher.js
import React, { useState } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const TestScoreFetcher = ({ onSuccess }) => {
  const [studentId, setStudentId] = useState("");

  const fetchTestScores = async (studentId) => {
    try {
      const res = await sendGetRequest(
        `http://localhost:8080/api/v1/tests/${studentId}`
      );
      if (res.data.status === "success") {
        const data = res.data.data;
        const fetchedTestIds = data.map((test) => test.testId);
        const fetchedScores = data.map((test) => test.score);
        onSuccess(fetchedTestIds, fetchedScores); // Call the callback function
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
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
