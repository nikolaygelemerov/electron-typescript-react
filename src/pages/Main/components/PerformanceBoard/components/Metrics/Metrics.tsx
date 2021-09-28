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

  console.log('performanceMetrics: ', performanceMetrics);

  return (
    <div className={styles.Metrics}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.Metric}>
          <div className={styles.MetricStats}>
            <span className={styles.MetricColorBox} style={{ backgroundColor: metric.color }} />
            <span className={styles.MetricLabel}>{metric.label}</span>
            {Object.keys(performanceMetrics).length ? (
              <span>{performanceMetrics[metric.label]?.value}</span>
            ) : null}
          </div>
          <div
            className={styles.MetricType}
            style={{ backgroundColor: performanceMetrics[metric.label]?.metricChartTypeAxisColor }}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(Metrics);
