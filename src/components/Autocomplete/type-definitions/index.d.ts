/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, KeyboardEventHandler, RefObject } from 'react';

interface IUseFieldParams {
  initialValue?: T;
  name: string;
  onBlur?: (event: FocusEvent<any>) => void;
  onFocus?: (event: FocusEvent<any>) => void;
}

interface IAutocompleteProps extends IUseFieldParams {
  autoComplete?: string;
  disabled?: boolean;
  displayNameExtractor: (item) => string;
  id: string;
  initialValue?: any;
  Input: FC<IInputProps>;
  inputValueExtractor: (item) => string;
  keyExtractor: (item) => string;
  list: any[];
  Option: FC<IOptionProps>;
  onChange: Function;
  rowsToDisplay?: number;
  valid?: boolean;
  validating?: boolean;
  value: any;
  valueExtractor: (item) => any;
}

interface IInputProps {
  autoComplete?: string;
  disabled?: boolean;
  focused: boolean;
  id: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: KeyboardEventHandler;
  toggleFocus: (isOnFocus: boolean) => void;
  touched: boolean;
  valid: boolean;
  validating: boolean;
  value: string;
}

interface IOptionProps {
  displayName: string;
  isSelected: boolean;
  onChange: Function;
  onKeyDown: KeyboardEventHandler;
  ref: RefObject<HTMLButtonElement>;
  toggleFocus: (isOnFocus: boolean) => void;
  value: any;
}

interface IListProps {
  displayNameExtractor: (item) => string;
  inputValueExtractor: (item) => any;
  keyExtractor: (item) => string;
  list: any[];
  onChange: Function;
  onKeyDown: KeyboardEventHandler;
  Option: FC<IOptionProps>;
  optionFocusedIndex: number | null;
  rowsToDisplay: number;
  toggleOptionFocus: (isOnFocus: boolean) => void;
  value: any;
  valueExtractor: (item) => any;
}
