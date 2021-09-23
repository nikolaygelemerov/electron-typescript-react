/* eslint-disable no-undef */
import { FC, KeyboardEventHandler, RefObject, TransitionEventHandler } from 'react';

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
  hideScroll?: boolean;
  id: string;
  initialValue?: any;
  Input: FC<IInputProps>;
  inputValueExtractor: (item, list) => any;
  keyExtractor: (item) => string;
  list: any[];
  multiselect?: boolean;
  Option: FC<IOptionProps>;
  onChange: Function;
  placeholder?: string;
  rowsToDisplay?: number;
  singleItemExtractor?: (item) => string;
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
  placeholder?: string;
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
  hideScroll?: boolean;
  inputValueExtractor: (item, list) => any;
  keyExtractor: (item) => string;
  list: any[];
  multiselect?: boolean;
  onChange: Function;
  onKeyDown: KeyboardEventHandler;
  onTransitionEnd: TransitionEventHandler;
  Option: FC<IOptionProps>;
  optionFocusedIndex: number | null;
  rowsToDisplay: number;
  toggleOptionFocus: (isOnFocus: boolean) => void;
  value: any;
  valueExtractor: (item) => any;
}
