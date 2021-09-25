/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createContext, useContext } from 'react';

import { DEFAULT_METRICS_COUNT, IActionsValue, SCHEMA, useContextReducer } from '@services';

import { ActionType } from './action-types';
import { TAction } from './actions';

interface IInitialState {
  category: IMetricCategory;
  metrics: IMetric[];
  filespace: string;
}

const initialState: IInitialState = {
  category: SCHEMA[0],
  metrics: SCHEMA[0].metrics.slice(0, DEFAULT_METRICS_COUNT),
  filespace: ''
};

const ACTION_TYPES = {
  setCategory: ActionType.SET_CATEGORY,
  setMetric: ActionType.SET_METRIC,
  unsetMetric: ActionType.UNSET_METRIC,
  setFilespace: ActionType.SET_FILESPACE
};

const reducer = (state: IInitialState, action: TAction): IInitialState => {
  switch (action.type) {
    case ActionType.SET_CATEGORY:
      return { ...state, category: action.payload };

    case ActionType.SET_METRIC:
      if (state.metrics.some((metric) => metric.label === action.payload.label)) {
        return state;
      } else {
        return { ...state, metrics: [...state.metrics, action.payload] };
      }

    case ActionType.UNSET_METRIC:
      const metricIndex = state.metrics.findIndex(
        (metric) => metric.label === action.payload.label
      );

      if (metricIndex === -1) {
        return state;
      } else {
        const newMetrics = [...state.metrics];
        newMetrics.splice(metricIndex, 1);

        return { ...state, metrics: newMetrics };
      }

    case ActionType.SET_FILESPACE:
      return { ...state, filespace: action.payload };

    default:
      throw new Error(`No such action`);
  }
};

const initialContextState = {
  actions: {
    setCategory: (): void => {
      throw new Error('No Metricsrovider');
    },
    setMetric: (): void => {
      throw new Error('No Metricsrovider');
    },
    unsetMetric: (): void => {
      throw new Error('No Metricsrovider');
    },
    setFilespace: (): void => {
      throw new Error('No Metricsrovider');
    }
  },
  state: initialState
};

export const MetricsContext = createContext(initialContextState);

export const Metricsrovider: FC<{
  children: TChildren;
  actionTypes?: { [key: string]: TAction };
}> = ({ children, actionTypes = ACTION_TYPES }): JSX.Element => {
  const { value } = useContextReducer({
    actionTypes,
    initialState: initialState as any,
    reducer: reducer as any
  });

  return <MetricsContext.Provider value={value as any}>{children}</MetricsContext.Provider>;
};

export const useMetrics = (): {
  state: IInitialState;
  actions: IActionsValue;
} => useContext(MetricsContext);
