import { useContext, useEffect } from 'react';

import Chart from '../../Chart';

import UserContext from '../../../store/user-context';

const Performance = (props) => {
  const userCtx = useContext(UserContext);

  const chartData = [
    {
      title: 'Academic Test Progress',
      chartId: '6582d1c5-4d29-4304-8392-a018201da275',
      width: '500px',
      height: '300px',
    },
    {
      title: 'Cognitive Test Progress',
      chartId: '6582d2d4-2cc4-4ba6-8d02-db93f377893a',
      width: '450px',
      height: '300px',
    },
  ];

  return (
    <>
      <Chart chartData={chartData} />
    </>
  );
};

export default Performance;
