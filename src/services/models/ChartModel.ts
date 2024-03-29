import { CHART_TIME_SECONDS, METRIC_CHART_TYPE_AXIS_COLORS } from '@services/constants';
import colors from '@styles/shared/_variables.scss';

export class ChartModel {
  static #cache: { [key: string]: { xOffset: number; y: number }[] } = {};

  static addSeconds = (startTime: Date, seconds: number) => {
    return new Date(startTime.getTime() + seconds * 1000);
  };

  static getDataSet = ({
    label,
    performancePause,
    startTime,
    y
  }: {
    label: string;
    performancePause: boolean;
    startTime: Date;
    y: number;
  }) => {
    if (!performancePause) {
      if (!(label in ChartModel.#cache)) {
        ChartModel.#cache[label] = [{ xOffset: CHART_TIME_SECONDS, y }];
      } else if (ChartModel.#cache[label].length <= CHART_TIME_SECONDS) {
        ChartModel.#cache[label] = ChartModel.#cache[label].map((el) => ({
          ...el,
          xOffset: el.xOffset - 1
        }));

        ChartModel.#cache[label].push({
          xOffset: CHART_TIME_SECONDS,
          y
        });
      } else {
        ChartModel.#cache[label] = [
          ...ChartModel.#cache[label],
          {
            xOffset: CHART_TIME_SECONDS,
            y
          }
        ]
          .slice(ChartModel.#cache[label].length - CHART_TIME_SECONDS)
          .map((el, index) => ({ ...el, xOffset: index }));
      }
    }

    return ChartModel.#cache?.[label]
      ? ChartModel.#cache[label]
          .map((el) => ({
            x: ChartModel.addSeconds(startTime, el.xOffset),
            y: el.y
          }))
          .reverse()
      : [];
  };

  static deleteDataSetByMetrics = ({
    performanceMetrics
  }: {
    performanceMetrics: { [key: string]: IPerformanceMetric };
  }) => {
    Object.keys(ChartModel.#cache).forEach((label) => {
      if (!(label in performanceMetrics)) {
        delete ChartModel.#cache[label];
      }
    });
  };

  static deleteDataSetAll = () => {
    ChartModel.#cache = {};
  };

  static getTickValues = () => {
    const list = [];

    for (let i = 0; i <= CHART_TIME_SECONDS; i++) {
      list.push(i);
    }

    return list;
  };

  static formatTick = (x: number) => CHART_TIME_SECONDS - x;

  static getStyles = () => {
    return {
      parent: {
        background: colors.color_10_brand,
        boxSizing: 'border-box',
        display: 'inline',
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif"
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: colors.color_8_brand,
        fontFamily: 'inherit',
        fontSize: '1.8rem',
        fontWeight: 'bold'
      },

      // INDEPENDENT AXIS
      axisSeconds: {
        grid: {
          stroke: ({ tick }: { tick: number }) =>
            tick % 5 === 0 ? colors.color_13_grid : 'transparent',
          strokeWidth: 1
        },
        axis: { stroke: colors.color_8_brand, strokeWidth: 1 },
        ticks: {
          size: ({ tick }: { tick: number }) => {
            const tickSize = tick % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: colors.color_8_brand,
          strokeWidth: 1
        },
        tickLabels: {
          fill: colors.color_8_brand,
          fontFamily: 'inherit',
          fontSize: 12
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: ({ tick }: { tick: number }) => colors.color_13_grid,
          strokeWidth: 1
        },
        axis: { stroke: METRIC_CHART_TYPE_AXIS_COLORS.DataSizePerSecond, strokeWidth: 4 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: METRIC_CHART_TYPE_AXIS_COLORS.DataSizePerSecond,
          fontFamily: 'inherit',
          fontSize: 12
        }
      },
      labelOne: {
        textAnchor: 'end',
        fill: METRIC_CHART_TYPE_AXIS_COLORS.DataSizePerSecond,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic'
      },

      axisTwo: {
        grid: {
          stroke: ({ tick }: { tick: number }) => colors.color_13_grid,
          strokeWidth: 1
        },
        axis: { stroke: METRIC_CHART_TYPE_AXIS_COLORS.RatePerSecond, strokeWidth: 4 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: METRIC_CHART_TYPE_AXIS_COLORS.RatePerSecond,
          fontFamily: 'inherit',
          fontSize: 12
        }
      },
      labelTwo: {
        textAnchor: 'end',
        fill: METRIC_CHART_TYPE_AXIS_COLORS.RatePerSecond,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic'
      },

      axisThree: {
        grid: {
          stroke: ({ tick }: { tick: number }) => colors.color_13_grid,
          strokeWidth: 1
        },
        axis: { stroke: METRIC_CHART_TYPE_AXIS_COLORS.AverageTime, strokeWidth: 4 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: METRIC_CHART_TYPE_AXIS_COLORS.AverageTime,
          fontFamily: 'inherit',
          fontSize: 12
        }
      },
      labelThree: {
        textAnchor: 'end',
        fill: METRIC_CHART_TYPE_AXIS_COLORS.AverageTime,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic'
      }
    };
  };

  static getLineStyles = ({ strokeColor }: { strokeColor: string }) => ({
    data: { stroke: strokeColor, strokeWidth: 2.5 }
  });
}
