import { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import AuthContext from '../../../store/auth-context';
// import {
//   LineChart,
//   ResponsiveContainer,
//   Legend,
//   Tooltip,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from 'recharts';

const ChartF = ({ chartData }) => {
  const authCtx = useContext(AuthContext);

  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-project-0-usqrc',
    getUserToken: async function () {
      return authCtx.token;
    },
  });
  const chartDiv1 = useRef(null);
  const chartDiv2 = useRef(null);
  const [, setRendered] = useState(false);

  const [chart0] = useState(
    sdk.createChart({
      chartId: chartData[0].chartId,
      height: chartData[0].height,
      width: chartData[0].width,
      theme: 'light',
    })
  );

  const [chart1] = useState(
    sdk.createChart({
      chartId: chartData[1].chartId,
      height: chartData[1].height,
      width: chartData[1].width,
      theme: 'light',
    })
  );

  useEffect(() => {
    chart0
      .render(chartDiv1.current)
      .then(() => setRendered(true))
      .catch((err) => console.log('Error during Charts rendering.', err));

    chart1
      .render(chartDiv2.current)
      .then(() => setRendered(true))
      .catch((err) => console.log('Error during Charts rendering.', err));
  }, [chart0, chart1]);

  return (
    <>
      <div className="chart-container">
        <div className="chart">
          <h3 className="chart__title">{chartData[0].title}</h3>
          <div className="chart__content" ref={chartDiv1} />
        </div>
      </div>

      <div className="chart">
        <h3 className="chart__title">{chartData[1].title}</h3>
        <div className="chart__content" ref={chartDiv2} />
      </div>
    </>
  );
};

// const Chart = ({ chartData }) => {
//   return (
//     <>
//       <h1 className="text-heading">{chartData.title}</h1>
//       <ResponsiveContainer width="100%" aspect={3}>
//         <LineChart data={chartData.data} margin={{ right: 300 }}>
//           <CartesianGrid />
//           <XAxis dataKey="name" interval={'preserveStartEnd'} />
//           <YAxis></YAxis>
//           <Legend />
//           <Tooltip />

//           {/* <Line dataKey="student" stroke="black" activeDot={{ r: 8 }} /> */}
//           {/* <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} /> */}
//         </LineChart>
//       </ResponsiveContainer>
//     </>
//   );
// };

export default ChartF;
