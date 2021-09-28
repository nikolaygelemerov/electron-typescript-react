import { MetricType } from '@services/constants';

export class PerformanceModel {
  static calculatePerfValue = ({
    fields,
    prevData,
    newData,
    pollInterval,
    type
  }: {
    fields: string[];
    prevData: { [key: string]: number };
    newData: { [key: string]: number };
    pollInterval: number;
    type: string;
  }) => {
    let result: number | string = 0;

    if (prevData === null || newData === null) {
      return result;
    }

    switch (type) {
      case MetricType.RATE_PER_SECOND:
        const rateField = fields[0];

        // consider poll interval 1(second)
        result = newData[rateField] - prevData[rateField];
        break;

      case MetricType.AVERAGE_TIME:
        const timeField = fields[0];
        const countField = fields[1];

        const changedTime = newData[timeField] - prevData[timeField];
        const changedCount = newData[countField] - prevData[countField];

        // Time in nanoseconds
        const nsCalc = changedCount !== 0 ? changedTime / changedCount : 0;

        result =
          nsCalc < 1000
            ? `${nsCalc.toFixed(2)}ns` //nanoseconds
            : nsCalc < 1000000
            ? `${(nsCalc / 1000).toFixed(2)}ms` //microseconds
            : nsCalc < 1000000000
            ? `${(nsCalc / 1000000).toFixed(2)}msec` //milliseconds
            : `${(nsCalc / 1000000000).toFixed(2)}sec`; //seconds
        break;

      case MetricType.DATA_SIZE_PER_SECOND:
        const dataSizeField = fields[0];

        // consider poll interval 1(second)
        const bytesCalc = newData[dataSizeField] - prevData[dataSizeField]; // Bytes

        result =
          bytesCalc < 1000
            ? `${bytesCalc.toFixed(2)}B` // Bytes
            : bytesCalc < 1000000
            ? `${(bytesCalc / 1000).toFixed(2)}KiB` //KiB
            : bytesCalc < 1000000000
            ? `${(bytesCalc / 1000000).toFixed(2)}MiB` //MiB
            : `${(bytesCalc / 1000000000).toFixed(2)}GiB`; //GiB

        break;

      default:
        result = 0;
    }

    return result;
  };
}
