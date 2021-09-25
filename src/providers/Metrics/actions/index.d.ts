import { ActionType } from '../action-types';

interface ISetCategoryAction {
  type: ActionType.SET_CATEGORY;
  payload: IMetricCategory;
}

interface ISetMetricAction {
  type: ActionType.SET_METRIC;
  payload: IMetric;
}

interface ISetFilespaceAction {
  type: ActionType.SET_FILESPACE;
  payload: string;
}

interface IUnsetMetricAction {
  type: ActionType.UNSET_METRIC;
  payload: IMetric;
}

export type TAction =
  | ISetCategoryAction
  | ISetMetricAction
  | ISetFilespaceAction
  | IUnsetMetricAction;
