import { memo } from 'react';

import { useMetrics, usePerformance } from '@providers';

import styles from './Metrics.scss';

const Metrics = () => {
  const {
    state: { metrics }
  } = useMetrics();

  const {
    state: { performanceMetrics }
  } = usePerformance();

  return (
    <div className={styles.Metrics}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.Metric}>
          <span className={styles.MetricColorBox} style={{ backgroundColor: metric.color }} />
          {metric.label}
          {Object.keys(performanceMetrics).length ? (
            <span>{performanceMetrics[metric.label]?.value.toFixed(2)}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default memo(Metrics);
