import { ActionType } from '../action-types';

interface ISetPerformanceMetricsAction {
  type: ActionType.SET_PERFORMANCE_METRICS;
  payload: { [key: string]: IPerformanceMetric };
}

interface IUpdatePerformanceMetricAction {
  type: ActionType.UPDATE_PERFORMANCE_METRIC;
  payload: IPerformanceMetric;
}

export type TAction = ISetPerformanceMetricsAction | IUpdatePerformanceMetricAction;
