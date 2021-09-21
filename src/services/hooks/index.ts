/* eslint-disable react-hooks/exhaustive-deps */
import {
  DependencyList,
  EffectCallback,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useReducer
} from 'react';

export interface IState {
  [key: string]: unknown;
}

interface IAction {
  type: unknown;
  payload: unknown;
}

export interface IActionsValue {
  [key: string]: (payload: unknown) => void;
}

type TReducer = (prevState: IState, action: IAction) => IState;

export const useContextReducer = ({
  actionTypes,
  initialState,
  reducer
}: {
  actionTypes: { [key: string]: unknown };
  initialState: IState;
  reducer: TReducer;
}): {
  value: {
    state: IState;
    actions: IActionsValue;
  };
} => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newActions = useMemo(
    () =>
      Object.keys(actionTypes).reduce((accum, actionName) => {
        accum[actionName] = (payload: unknown) => {
          dispatch({ payload, type: actionTypes[actionName] });
        };

        return accum;
      }, {} as IActionsValue),

    [actionTypes]
  );

  const newValue = useMemo(() => ({ state, actions: newActions }), [newActions, state]);

  return { value: newValue };
};

export const useLastDiffValue = <T>(value: T): T | undefined => {
  const valueList = useRef<T[]>([]);

  valueList.current.unshift(value);

  const lastDiffValue = valueList.current.find((listValue) => listValue !== value);

  return lastDiffValue;
};

type UpdateCallback = EffectCallback | { (): Promise<void> };

export const useUpdate = (callback: UpdateCallback, deps = [] as DependencyList) => {
  useEffect(() => {
    callback();
  }, deps);
};

export const useUpdateOnly = (callback: UpdateCallback, deps = [] as DependencyList): void => {
  const mountRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }
    callback();
  }, deps);
};

export const useClass = (classes = [] as unknown[], deps = [] as DependencyList) =>
  useMemo<string>(() => classes.filter(Boolean).join(' '), deps);

export const usePrevious = <T>(value: T) => {
  const ref = useRef(value);
  const refOld = useRef(ref.current);

  useUpdateOnly(() => {
    refOld.current = ref.current;
    ref.current = value;
  }, [value]);

  return refOld.current;
};

export const useMount = (callback: UpdateCallback) => {
  useEffect(() => {
    callback();
  }, []);
};

type CleanupCallback = void | (() => void | undefined);

export const useUnmount = (callback: CleanupCallback) => {
  useEffect(() => callback, []);
};

type UseMutationObserverProps = {
  callback: MutationCallback;
  config: MutationObserverInit;
  target: RefObject<Node>;
};

export const useMutationObserver = ({ callback, config, target }: UseMutationObserverProps) => {
  const observerRef = useRef<MutationObserver | null>(null);

  useUpdate(() => {
    if (target.current && observerRef.current === null) {
      observerRef.current = new MutationObserver(callback);
      observerRef.current.observe(target.current, config);
    }
  }, [target.current]);

  useUnmount(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  });
};
