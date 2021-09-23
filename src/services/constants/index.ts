import colors from '@styles/shared/_variables.scss';

export const SCHEMA: IPerformanceCategory[] = [
  {
    name: 'fs',
    label: 'File system',
    path: 'fs/perf',
    metrics: [
      {
        label: 'Read MB/s',
        shortLabel: 'readBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesRead'],
        color: colors.color1
      },
      {
        label: 'Write MB/s',
        shortLabel: 'writeBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesWritten'],
        color: colors.color2
      },
      {
        label: 'Read requests/s',
        shortLabel: 'reads',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalReads'],
        color: colors.color3
      },
      {
        label: 'Write requests/s',
        shortLabel: 'writes',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalWrites'],
        color: colors.color4
      },
      {
        label: 'Total requests/s',
        shortLabel: 'ops',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalOps'],
        color: colors.color5
      },
      {
        label: 'Average read time',
        shortLabel: 'readTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalReadTime', 'totalReads'],
        color: colors.color6
      },
      {
        label: 'Average write time',
        shortLabel: 'writeTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalWriteTime', 'totalWrites'],
        color: colors.color7
      },
      {
        label: 'Average request time',
        shortLabel: 'opTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalOpTime', 'totalOps'],
        color: colors.color8
      }
    ]
  },
  {
    name: 'cache',
    label: 'Data cache',
    path: 'cache/perf',
    metrics: [
      {
        label: 'Total read throughput',
        shortLabel: 'readBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesRead'],
        color: colors.color9
      },
      {
        label: 'Cached(hit) read throughput',
        shortLabel: 'hitBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesHit'],
        color: colors.color10
      },
      {
        label: 'Backend(miss) read throughput',
        shortLabel: 'missBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesMissed'],
        color: colors.color11
      },
      {
        label: 'Prefetch read throughput',
        shortLabel: 'prefetchBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['prefetchBytes'],
        color: colors.color12
      },
      {
        label: 'Total write throughput',
        shortLabel: 'writeBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesWritten'],
        color: colors.color13
      },
      {
        label: 'Total reads/s',
        shortLabel: 'reads',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalReads'],
        color: colors.color14
      },
      {
        label: 'Cached(hit) reads/s',
        shortLabel: 'hits',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalHits'],
        color: colors.color15
      },
      {
        label: 'Backend(miss) reads/s',
        shortLabel: 'misses',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalMisses'],
        color: colors.color16
      },
      {
        label: 'Prefetches/s',
        shortLabel: 'prefetches',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['prefetches'],
        color: colors.color17
      },
      {
        label: 'Total writes/s',
        shortLabel: 'writes',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalWrites'],
        color: colors.color18
      },
      {
        label: 'Backend writes/s',
        shortLabel: 'bckWrites',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalBackendWrites'],
        color: colors.color19
      },
      {
        label: 'Average read time',
        shortLabel: 'readTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalReadTime', 'totalReads'],
        color: colors.color20
      },
      {
        label: 'Average write time',
        shortLabel: 'writeTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalWriteTime', 'totalWrites'],
        color: colors.color21
      }
    ]
  },
  {
    name: 'objectstore',
    label: 'Object store',
    path: 'objectstore/perf',
    metrics: [
      {
        label: 'GET throughput',
        shortLabel: 'getBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalGetBytes'],
        color: colors.color22
      },
      {
        label: 'PUT throughput',
        shortLabel: 'putBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalPutBytes'],
        color: colors.color23
      },
      {
        label: 'GET requests/s',
        shortLabel: 'gets',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['getObjectRequests'],
        color: colors.color24
      },
      {
        label: 'PUT requests/s',
        shortLabel: 'puts',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['putObjectRequests'],
        color: colors.color25
      },
      {
        label: 'Average GET request time',
        shortLabel: 'getTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalGetObjectTime', 'getObjectRequests'],
        color: colors.color26
      },
      {
        label: 'Average PUT request time',
        shortLabel: 'putTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalPutObjectTime', 'putObjectRequests'],
        color: colors.color27
      }
    ]
  },
  {
    name: '',
    label: '',
    path: '',
    metrics: []
  }
];

export const DEFAULT_METRICS_COUNT = 3;
