/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createContext, useContext } from 'react';

import { DEFAULT_METRICS_COUNT, IActionsValue, SCHEMA, useContextReducer } from '@services';

import { ActionType } from './action-types';
import { TAction } from './actions';

interface IInitialState {
  category: IPerformanceCategory;
  metrics: IPerformanceMetric[];
  filespace: string;
}

const initialState: IInitialState = {
  category: SCHEMA[0],
  metrics: SCHEMA[0].metrics.splice(0, DEFAULT_METRICS_COUNT),
  filespace: ''
};

export const ACTION_TYPES = {
  setCategory: ActionType.SET_CATEGORY,
  setMetric: ActionType.SET_METRIC,
  unsetMetric: ActionType.UNSET_METRIC,
  setFilespace: ActionType.SET_FILESPACE
};

const reducer = (state: IInitialState, action: TAction): IInitialState => {
  switch (action.type) {
    case ActionType.SET_CATEGORY:
      return { ...state, category: SCHEMA[action.payload] };

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
        const newMetrics = state.metrics.splice(metricIndex, 1);

        return { ...state, metrics: newMetrics };
      }

    case ActionType.SET_FILESPACE:
      return { ...state, filespace: action.payload };

    default:
      throw new Error(`No such action`);
  }
};

export const initialContextState = {
  actions: {
    setCategory: (): void => {
      throw new Error('No FilterProvider');
    },
    setMetric: (): void => {
      throw new Error('No FilterProvider');
    },
    unsetMetric: (): void => {
      throw new Error('No FilterProvider');
    },
    setFilespace: (): void => {
      throw new Error('No FilterProvider');
    }
  },
  state: initialState
};

export const PerformanceContext = createContext(initialContextState);

export const PerformanceProvider: FC<{
  children: TChildren;
  actionTypes?: { [key: string]: TAction };
}> = ({ children, actionTypes = ACTION_TYPES }): JSX.Element => {
  const { value } = useContextReducer({
    actionTypes,
    initialState: initialState as any,
    reducer: reducer as any
  });

  return <PerformanceContext.Provider value={value as any}>{children}</PerformanceContext.Provider>;
};

export const usePerformance = (): {
  state: IInitialState;
  actions: IActionsValue;
} => useContext(PerformanceContext);
