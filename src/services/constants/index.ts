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
        fields: ['totalBytesRead']
      },
      {
        label: 'Write MB/s',
        shortLabel: 'writeBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesWritten']
      },
      {
        label: 'Read requests/s',
        shortLabel: 'reads',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalReads']
      },
      {
        label: 'Write requests/s',
        shortLabel: 'writes',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalWrites']
      },
      {
        label: 'Total requests/s',
        shortLabel: 'ops',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalOps']
      },
      {
        label: 'Average read time',
        shortLabel: 'readTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalReadTime', 'totalReads']
      },
      {
        label: 'Average write time',
        shortLabel: 'writeTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalWriteTime', 'totalWrites']
      },
      {
        label: 'Average request time',
        shortLabel: 'opTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalOpTime', 'totalOps']
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
        fields: ['totalBytesRead']
      },
      {
        label: 'Cached(hit) read throughput',
        shortLabel: 'hitBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesHit']
      },
      {
        label: 'Backend(miss) read throughput',
        shortLabel: 'missBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesMissed']
      },
      {
        label: 'Prefetch read throughput',
        shortLabel: 'prefetchBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['prefetchBytes']
      },
      {
        label: 'Total write throughput',
        shortLabel: 'writeBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalBytesWritten']
      },
      {
        label: 'Total reads/s',
        shortLabel: 'reads',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalReads']
      },
      {
        label: 'Cached(hit) reads/s',
        shortLabel: 'hits',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalHits']
      },
      {
        label: 'Backend(miss) reads/s',
        shortLabel: 'misses',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalMisses']
      },
      {
        label: 'Prefetches/s',
        shortLabel: 'prefetches',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['prefetches']
      },
      {
        label: 'Total writes/s',
        shortLabel: 'writes',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalWrites']
      },
      {
        label: 'Backend writes/s',
        shortLabel: 'bckWrites',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['totalBackendWrites']
      },
      {
        label: 'Average read time',
        shortLabel: 'readTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalReadTime', 'totalReads']
      },
      {
        label: 'Average write time',
        shortLabel: 'writeTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalWriteTime', 'totalWrites']
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
        fields: ['totalGetBytes']
      },
      {
        label: 'PUT throughput',
        shortLabel: 'putBytes',
        group: 'throughput',
        type: 'DataSizePerSecond',
        fields: ['totalPutBytes']
      },
      {
        label: 'GET requests/s',
        shortLabel: 'gets',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['getObjectRequests']
      },
      {
        label: 'PUT requests/s',
        shortLabel: 'puts',
        group: 'iops',
        type: 'RatePerSecond',
        fields: ['putObjectRequests']
      },
      {
        label: 'Average GET request time',
        shortLabel: 'getTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalGetObjectTime', 'getObjectRequests']
      },
      {
        label: 'Average PUT request time',
        shortLabel: 'putTime',
        group: 'latency',
        type: 'AverageTime',
        fields: ['totalPutObjectTime', 'putObjectRequests']
      }
    ]
  }
];

export const DEFAULT_METRICS_COUNT = 3;
