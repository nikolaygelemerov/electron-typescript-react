import { ActionType } from '../action-types';

interface ISetPerformanceMetricsAction {
  type: ActionType.SET_PERFORMANCE_METRICS;
  payload: { [key: string]: IPerformanceMetric };
}

interface ISetPerformancePause {
  type: ActionType.SET_PERFORMANCE_PAUSE;
  payload: boolean;
}

interface IUpdatePerformanceMetricAction {
  type: ActionType.UPDATE_PERFORMANCE_METRIC;
  payload: IPerformanceMetric;
}

export type TAction =
  | ISetPerformanceMetricsAction
  | ISetPerformancePause
  | IUpdatePerformanceMetricAction;
