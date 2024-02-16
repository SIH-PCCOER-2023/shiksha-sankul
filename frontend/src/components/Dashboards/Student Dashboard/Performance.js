import React, { useState } from "react";
import LineChart from "./LineChart";
import TestScoreFetcher from "./TestScoreFetcher";

const Performance = (props) => {
  const [testIds, setTestIds] = useState([]);
  const [scores, setScores] = useState([]);

  const handleTestScores = (fetchedTestIds, fetchedScores) => {
    setTestIds(fetchedTestIds);
    setScores(fetchedScores);
  };

  return (
    <>
      {/* Move TestScoreFetcher component inside Performance */}
      <TestScoreFetcher onSuccess={handleTestScores} />

      {/* Pass testIds and scores to LineChart */}
      {/* <LineChart labels={testIds} values={scores} /> */}
    </>
  );
};

export default Performance;
