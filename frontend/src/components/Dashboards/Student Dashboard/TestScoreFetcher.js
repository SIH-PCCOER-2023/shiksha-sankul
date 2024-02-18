// TestScoreFetcher.js
import React, { useState } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const TestScoreFetcher = ({ onSuccess }) => {
  const [rollNumber, setRollNumber] = useState("");

  const fetchTestScores = async (rollNumber) => {
    try {
      const res = await sendGetRequest(
        `http://localhost:8080/api/v1/student/array/${rollNumber}`
      );

      if (res.data.status === "success") {
        const marks = res.data.data.data; // Assuming obtained scores are in the 'data' property of the response
        const labels = marks.map((mark, index) => {
          return index + 1;
        });

        onSuccess(labels, marks);
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
    fetchTestScores(rollNumber);
  };

  return (
    <div className="test-score-fetcher">
      <h2>Test Score Fetcher</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rollNumber">Roll Number:</label>
        <input
          type="text"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button type="submit">Fetch Scores</button>
      </form>
    </div>
  );
};

export default TestScoreFetcher;
