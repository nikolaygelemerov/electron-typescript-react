import { useMemo, useState } from 'react';

import { IModalContext } from '../type-definitions';

import * as actions from '../actions';

export const useModalContextValue = (initialState: IModalContext) => {
  const [value, setValue] = useState(initialState);

  const newActions = useMemo(() => {
    return Object.keys(actions).reduce<{ [key: string]: Function }>((accum, actionName) => {
      accum[actionName] = (...restParams: any[]) => {
        (actions as { [key: string]: Function })[actionName](...restParams, setValue);
      };

      return accum;
    }, {});
  }, []);

  const newValue = useMemo(() => ({ ...value, actions: newActions }), [newActions, value]);

  return { value: newValue };
};
