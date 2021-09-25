import { useCallback, useState } from 'react';
import axios from 'axios';

import { useMetrics, usePerformance } from '@providers';
import { GlobalModel, PerformanceModel, useMount, useUpdate } from '@services';

const POLL_INTERVAL = 1000;

export const PollManager = () => {
  const [state, setState] = useState<{ [key: string]: any }>({
    cache: { prevData: null, newData: null },
    fs: { prevData: null, newData: null },
    objectstore: { prevData: null, newData: null }
  });

  const {
    state: { metrics }
  } = useMetrics();

  const {
    actions: { setPerformanceMetrics, updatePerformanceMetric }
  } = usePerformance();

  const fetchData = useCallback(async () => {
    try {
      const [
        { data: fsData },
        { data: cacheData },
        { data: objectstoreData },
        { data: statusData }
      ] = await Promise.all([
        axios.get('http://localhost:7778/fs/perf'),
        axios.get('http://localhost:7778/cache/perf'),
        axios.get('http://localhost:7778/objectstore/perf'),
        axios.get('http://localhost:7778/app/status')
      ]);

      setState((prevState) => ({
        cache: { prevData: prevState.cache.newData, newData: cacheData },
        fs: { prevData: prevState.fs.newData, newData: fsData },
        objectstore: { prevData: prevState.objectstore.newData, newData: objectstoreData }
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useMount(() => {
    fetchData();
    GlobalModel.setRAFInterval(fetchData, POLL_INTERVAL);
  });

  useUpdate(() => {
    const performanceMetrics = metrics.reduce((accum, metric) => {
      accum[metric.label] = {
        label: metric.label,
        value: PerformanceModel.calculatePerfValue({
          fields: metric.fields,
          prevData: state[metric.category].prevData,
          newData: state[metric.category].newData,
          pollInterval: POLL_INTERVAL,
          type: metric.type
        })
      };

      return accum;
    }, {} as { [key: string]: IPerformanceMetric });

    setPerformanceMetrics(performanceMetrics);
  }, [metrics]);

  useUpdate(() => {
    metrics.forEach((metric) => {
      updatePerformanceMetric({
        label: metric.label,
        value: PerformanceModel.calculatePerfValue({
          fields: metric.fields,
          prevData: state[metric.category].prevData,
          newData: state[metric.category].newData,
          pollInterval: POLL_INTERVAL,
          type: metric.type
        })
      });
    });
  }, [state]);

  return null;
};
