import { memo } from 'react';

import { Chart, Metrics } from './components';

import styles from './PerformanceBoard.scss';

const PerformanceBoard = () => {
  return (
    <section className={styles.PerformanceBoard}>
      <Chart />
      <Metrics />
    </section>
  );
};

export default memo(PerformanceBoard);
