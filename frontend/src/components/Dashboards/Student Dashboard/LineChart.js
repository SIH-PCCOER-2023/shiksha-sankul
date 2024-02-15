// LineChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ labels, values }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      renderChart();
    }
  }, [labels, values]);

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
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
        scales: {
          x: {
            title: {
              display: true,
              text: "Test ID",
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
    });
  };

  return (
    <div className="line-chart">
      <h2>Line Chart</h2>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default LineChart;
