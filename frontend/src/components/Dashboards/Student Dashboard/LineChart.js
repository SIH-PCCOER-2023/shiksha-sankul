import React, { useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ labels, values }) => {
  const chartRef = useRef(null);

  console.log(labels);
  console.log(values);

  const renderChart = useCallback(() => {
    const ctx = chartRef.current.getContext("2d");
    const config = {
      type: "line",
      data: {
        labels: labels, // Test IDs on x-axis
        datasets: [
          {
            label: "Test Scores",
            data: values, // Test scores on y-axis
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "No. of Tests",
            },
          },
          y: {
            title: {
              display: true,
              text: "Test Score",
            },
          },
        },
      },
    };

    new Chart(ctx, config);
  }, [labels, values]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      renderChart();
    }
  }, [renderChart]);

  return (
    <>
      {values.length > 0 && (
        <div className="line-chart" style={{ width: "800px", height: "600px" }}>
          <h2>Line Chart</h2>
          <canvas ref={chartRef}></canvas>
        </div>
      )}
    </>
  );
};

export default LineChart;
