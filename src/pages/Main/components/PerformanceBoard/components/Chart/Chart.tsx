import { FC, Fragment, memo, useMemo, useRef, useState } from 'react';
import { VictoryAxis, VictoryLine, VictoryLabel } from 'victory';

import { usePerformance } from '@providers';
import { ChartModel, GlobalModel, CHART_TIME_SECONDS, useUpdateOnly } from '@services';
import colors from '@styles/shared/_variables.scss';

const Lines: FC<{
  performanceMetrics: { [key: string]: IPerformanceMetric };
  performancePause: boolean;
  startTime: Date;
}> = memo(({ performanceMetrics, performancePause, startTime }) => {
  const [key, setKey] = useState(GlobalModel.idGenerator());

  useUpdateOnly(() => {
    if (performancePause === false) {
      ChartModel.deleteDataSetAll();
      setKey(GlobalModel.idGenerator());
    }
  }, [performancePause]);

  return (
    <Fragment key={key}>
      {Object.keys(performanceMetrics).map((label) => {
        const metric = performanceMetrics[label];

        return (
          <VictoryLine
            key={label}
            data={ChartModel.getDataSet({
              label: metric.label,
              performancePause,
              startTime,
              y: metric.value
            })}
            domain={{
              x: [startTime, ChartModel.addSeconds(startTime, CHART_TIME_SECONDS)],
              y: [0, 20]
            }}
            interpolation="monotoneX"
            scale={{ x: 'time', y: 'linear' }}
            standalone={false}
            style={ChartModel.getLineStyles({ strokeColor: metric.color })}
          />
        );
      })}
    </Fragment>
  );
});

const Chart: FC = () => {
  const startTimeRef = useRef(new Date());

  const {
    state: { performanceMetrics, performancePause }
  } = usePerformance();

  const styles = useMemo(() => ChartModel.getStyles(), []);
  const tickValues = useMemo(() => ChartModel.getTickValues(), []);

  return (
    <svg style={styles.parent as any} viewBox="0 0 450 350">
      <rect x="0" y="0" width="10" height="30" fill={colors.color_2_brand} />
      <VictoryLabel x={25} y={24} style={styles.title} text="Performance" />

      <g transform={'translate(0, 40)'}>
        <VictoryAxis
          scale="time"
          standalone={false}
          style={styles.axisSeconds as any}
          tickValues={tickValues}
          tickFormat={(x) => {
            if (x % 5 === 0) {
              return x;
            }
          }}
        />

        <VictoryAxis
          dependentAxis
          domain={[0, 20]}
          offsetX={50}
          orientation="left"
          standalone={false}
          style={styles.axisOne as any}
        />

        <Lines
          performanceMetrics={performanceMetrics}
          performancePause={performancePause}
          startTime={startTimeRef.current}
        />
      </g>
    </svg>
  );
};

export default memo(Chart);
