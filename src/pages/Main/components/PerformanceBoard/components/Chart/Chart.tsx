import { FC, Fragment, memo, useMemo, useRef, useState } from 'react';
import { VictoryAxis, VictoryLine, VictoryLabel } from 'victory';

import { usePerformance } from '@providers';
import {
  ChartModel,
  GlobalModel,
  CHART_TIME_SECONDS,
  MetricType,
  METRIC_CHART_DOMAIN,
  useUpdate,
  useUpdateOnly
} from '@services';
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

  useUpdate(() => {
    ChartModel.deleteDataSetByMetrics({ performanceMetrics });
  }, [performanceMetrics]);

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
              y: parseInt(metric.value.toString())
            })}
            domain={{
              x: [startTime, ChartModel.addSeconds(startTime, CHART_TIME_SECONDS)],
              y: metric.metricChartDomain
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

  const hasRatePerSecondAxis = useMemo(
    () =>
      Object.keys(performanceMetrics).some(
        (label) => performanceMetrics[label].type === MetricType.RATE_PER_SECOND
      ),
    [performanceMetrics]
  );

  const hasAverageTimeAxis = useMemo(
    () =>
      Object.keys(performanceMetrics).some(
        (label) => performanceMetrics[label].type === MetricType.AVERAGE_TIME
      ),
    [performanceMetrics]
  );

  const hasDataSizePerSecondAxis = useMemo(
    () =>
      Object.keys(performanceMetrics).some(
        (label) => performanceMetrics[label].type === MetricType.DATA_SIZE_PER_SECOND
      ),
    [performanceMetrics]
  );

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
            const newX = ChartModel.formatTick(x);

            if (newX % 5 === 0) {
              return ChartModel.formatTick(x) as any;
            }
          }}
        />

        {hasDataSizePerSecondAxis ? (
          <>
            <VictoryAxis
              dependentAxis
              domain={METRIC_CHART_DOMAIN.DataSizePerSecond as any}
              offsetX={50}
              orientation="left"
              standalone={false}
              style={styles.axisOne as any}
            />
            <VictoryLabel x={80} y={30} style={styles.labelOne} text={'DataSizePerSecond'} />
          </>
        ) : null}

        {hasRatePerSecondAxis ? (
          <>
            <VictoryAxis
              dependentAxis
              domain={METRIC_CHART_DOMAIN.RatePerSecond as any}
              offsetX={!hasDataSizePerSecondAxis ? 50 : hasAverageTimeAxis ? 225 : 50}
              orientation={
                !hasDataSizePerSecondAxis ? 'left' : hasAverageTimeAxis ? 'left' : 'right'
              }
              standalone={false}
              style={styles.axisTwo as any}
            />
            <VictoryLabel
              x={!hasDataSizePerSecondAxis ? 50 : hasAverageTimeAxis ? 250 : 425}
              y={30}
              style={styles.labelTwo}
              text={'RatePerSecond'}
            />
          </>
        ) : null}

        {hasAverageTimeAxis ? (
          <>
            <VictoryAxis
              dependentAxis
              domain={METRIC_CHART_DOMAIN.AverageTime as any}
              offsetX={50}
              orientation={!hasDataSizePerSecondAxis && !hasRatePerSecondAxis ? 'left' : 'right'}
              standalone={false}
              style={styles.axisThree as any}
            />
            <VictoryLabel
              x={!hasDataSizePerSecondAxis && !hasRatePerSecondAxis ? 50 : 425}
              y={30}
              style={styles.labelThree}
              text={'AverageTime'}
            />
          </>
        ) : null}

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
