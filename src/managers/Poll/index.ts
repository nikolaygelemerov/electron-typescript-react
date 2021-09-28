import { useCallback, useState } from 'react';
import axios from 'axios';

import { useMetrics, usePerformance } from '@providers';
import {
  GlobalModel,
  METRIC_CHART_DOMAIN,
  METRIC_CHART_TYPE_AXIS_COLORS,
  PerformanceModel,
  useMount,
  useUpdate
} from '@services';

const POLL_INTERVAL = 1000;

export const PollManager = () => {
  const [state, setState] = useState<{ [key: string]: any }>({
    cache: { prevData: null, newData: null },
    fs: { prevData: null, newData: null },
    objectstore: { prevData: null, newData: null }
  });

  const {
    actions: { setFilespace },
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

      setFilespace(statusData.fileSystem.name);
    } catch (error) {
      console.error(error);
    }
  }, [setFilespace]);

  useMount(() => {
    fetchData();
    GlobalModel.setRAFInterval(fetchData, POLL_INTERVAL);
  });

  useUpdate(() => {
    const performanceMetrics = metrics.reduce((accum, metric) => {
      accum[metric.label] = {
        color: metric.color,
        label: metric.label,
        metricChartDomain: (METRIC_CHART_DOMAIN as any)[metric.type],
        metricChartTypeAxisColor: (METRIC_CHART_TYPE_AXIS_COLORS as any)[metric.type],
        type: metric.type,
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
        color: metric.color,
        metricChartDomain: (METRIC_CHART_DOMAIN as any)[metric.type],
        metricChartTypeAxisColor: (METRIC_CHART_TYPE_AXIS_COLORS as any)[metric.type],
        label: metric.label,
        type: metric.type,
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
