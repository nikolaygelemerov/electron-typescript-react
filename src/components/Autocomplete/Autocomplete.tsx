import React, { FC, memo, useCallback, useState } from 'react';

import { useUpdateOnly } from '@services';

import { IAutocompleteProps, IOptionProps } from './type-definitions';
import { useKeyCodes } from './hooks';
import { List } from './components';
import styles from './Autocomplete.scss';

const Autocomplete: FC<IAutocompleteProps> = ({
  autoComplete,
  disabled,
  displayNameExtractor,
  id,
  Input,
  inputValueExtractor,
  keyExtractor,
  list,
  name,
  onChange,
  Option,
  rowsToDisplay = 4,
  valid = true,
  validating = false,
  value = null,
  valueExtractor
}) => {
  const [focus, setFocus] = useState(false);

  const [{ optionFocus, optionFocusedIndex }, setOptionState] = useState<{
    optionFocus: boolean;
    optionFocusedIndex: number | null;
  }>({
    optionFocus: false,
    optionFocusedIndex: null
  });

  const [{ inputFocus, inputTouched, inputValue }, setInputState] = useState({
    inputFocus: false,
    inputTouched: false,
    inputValue: inputValueExtractor(value) || ''
  });

  const [listResults, setListResults] = useState<IOptionProps[]>([]);

  const { onInputKeyDown, onOptionKeyDown } = useKeyCodes({
    listResults,
    setOptionState
  });

  const toggleOptionFocus = useCallback((optionFocus) => {
    setOptionState((prevState) => ({ ...prevState, optionFocus }));
  }, []);

  const onInputChange = useCallback(
    (event) => {
      event.persist();

      setInputState((prevState) => ({
        ...prevState,
        inputValue: event.target.value
      }));
      onChange(null);
    },
    [onChange]
  );

  const toggInputleFocus = useCallback((inputFocus) => {
    setInputState((prevState) => ({
      ...prevState,
      inputFocus,
      ...(inputFocus && !prevState.inputTouched ? { inputTouched: true } : {})
    }));
  }, []);

  const onOptionChange = useCallback(
    (value) => {
      onChange(value);
      toggleOptionFocus(false);
      toggInputleFocus(false);
    },
    [onChange, toggInputleFocus, toggleOptionFocus]
  );

  useUpdateOnly(() => {
    inputFocus &&
      setListResults(list.filter((item) => inputValueExtractor(item).indexOf(inputValue) !== -1));
  }, [inputFocus, inputValue, list]);

  useUpdateOnly(() => {
    value &&
      setInputState((prevState) => ({
        ...prevState,
        inputValue: inputValueExtractor(value)
      }));
  }, [value]);

  useUpdateOnly(() => {
    setFocus(inputFocus || optionFocus);
  }, [inputFocus, optionFocus]);

  useUpdateOnly(() => {
    if (!focus) {
      setListResults([]);
      setOptionState((prevState) => ({
        ...prevState,
        optionFocusedIndex: null
      }));
      // !value &&
      //   setInputState((prevState) => ({ ...prevState, inputValue: '' }));
    }
  }, [focus]);

  return (
    <div className={styles.Autocomplete}>
      <Input
        autoComplete={autoComplete}
        disabled={disabled}
        focused={inputFocus}
        id={id}
        name={name}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        toggleFocus={toggInputleFocus}
        touched={inputTouched}
        valid={valid}
        validating={validating}
        value={inputValue}
      />
      <List
        displayNameExtractor={displayNameExtractor}
        inputValueExtractor={inputValueExtractor}
        keyExtractor={keyExtractor}
        list={listResults}
        onChange={onOptionChange}
        onKeyDown={onOptionKeyDown}
        Option={Option}
        optionFocusedIndex={optionFocusedIndex}
        rowsToDisplay={rowsToDisplay}
        toggleOptionFocus={toggleOptionFocus}
        value={value}
        valueExtractor={valueExtractor}
      />
    </div>
  );
};

export default memo(Autocomplete);
