/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createContext, useContext } from 'react';

import { IActionsValue, useContextReducer } from '@services';

import { ActionType } from './action-types';
import { TAction } from './actions';

interface IInitialState {
  performanceMetrics: { [key: string]: IPerformanceMetric };
}

const initialState: IInitialState = {
  performanceMetrics: {}
};

const ACTION_TYPES = {
  setPerformanceMetrics: ActionType.SET_PERFORMANCE_METRICS,
  updatePerformanceMetric: ActionType.UPDATE_PERFORMANCE_METRIC
};

const reducer = (state: IInitialState, action: TAction): IInitialState => {
  switch (action.type) {
    case ActionType.SET_PERFORMANCE_METRICS:
      return {
        ...state,
        performanceMetrics: action.payload
      };

    case ActionType.UPDATE_PERFORMANCE_METRIC:
      return {
        ...state,
        performanceMetrics: { ...state.performanceMetrics, [action.payload.label]: action.payload }
      };

    default:
      throw new Error(`No such action`);
  }
};

const initialContextState = {
  actions: {
    setPerformanceMetrics: (): void => {
      throw new Error('No PerformanceProvider');
    },
    updatePerformanceMetric: (): void => {
      throw new Error('No PerformanceProvider');
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
