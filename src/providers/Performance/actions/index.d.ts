import { ActionType } from '../action-types';

interface ISetCategoryAction {
  type: ActionType.SET_CATEGORY;
  payload: number;
}

interface ISetMetricAction {
  type: ActionType.SET_METRIC;
  payload: IPerformanceMetric;
}

interface ISetFilespaceAction {
  type: ActionType.SET_FILESPACE;
  payload: string;
}

interface IUnsetMetricAction {
  type: ActionType.UNSET_METRIC;
  payload: IPerformanceMetric;
}

export type TAction =
  | ISetCategoryAction
  | ISetMetricAction
  | ISetFilespaceAction
  | IUnsetMetricAction;
