enum MetricType {
  RATE_PER_SECOND = 'RatePerSecond',
  AVERAGE_TIME = 'AverageTime',
  DATA_SIZE_PER_SECOND = 'DataSizePerSecond'
}

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
    let result = 0;

    if (prevData === null || newData === null) {
      return result;
    }

    switch (type) {
      case MetricType.RATE_PER_SECOND:
        const rateField = fields[0];

        result = newData[rateField] - prevData[rateField];
        break;

      case MetricType.AVERAGE_TIME:
        const timeField = fields[0];
        const countField = fields[1];

        const changedTime = newData[timeField] - prevData[timeField];
        const changedCount = newData[countField] - prevData[countField];

        result = changedCount !== 0 ? changedTime / (changedCount * 1000) : 0;
        break;

      case MetricType.DATA_SIZE_PER_SECOND:
        const dataSizeField = fields[0];

        result = (newData[dataSizeField] - prevData[dataSizeField]) / 1000 / pollInterval; // MB/s
        break;

      default:
        result = 0;
    }

    return parseFloat(result.toFixed(2));
  };
}
