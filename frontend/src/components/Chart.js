import React, { useContext, useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import AuthContext from '../store/auth-context';

const Chart = ({ chartData }) => {
  const authCtx = useContext(AuthContext);

  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-project-0-usqrc',
    getUserToken: async function () {
      return authCtx.token;
    },
  });
  const chartDiv = useRef(null);
  const [, setRendered] = useState(false);

  const [chart] = useState(
    sdk.createChart({
      chartId: chartData.chartId,
      height: chartData.height,
      width: chartData.width,
      theme: 'light',
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log('Error during Charts rendering.', err));
  }, [chart]);

  return (
    <>
      <div className="chart-container">
        <div className="chart">
          <h3 className="chart__title">{chartData.title}</h3>
          <div className="chart__content" ref={chartDiv} />
        </div>
      </div>
    </>
  );
};

export default Chart;
