import { FC, memo, useCallback, useRef, useState } from 'react';

import { useClass, useMount, useUnmount, useUpdateOnly } from '@services';

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
  multiselect,
  name,
  onChange,
  Option,
  placeholder,
  rowsToDisplay = 4,
  singleItemExtractor,
  valid = true,
  validating = false,
  value,
  valueExtractor
}) => {
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const documentClickHandlerRef = useRef<Function | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
    inputValue: inputValueExtractor(value, list) || ''
  });

  const [listResults, setListResults] = useState<IOptionProps[]>([]);

  const { onInputKeyDown, onOptionKeyDown } = useKeyCodes({
    listResults,
    setOptionState
  });

  const toggleOptionFocus = useCallback((optionFocus) => {
    setOptionState((prevState) => ({ ...prevState, optionFocus }));
  }, []);

  const onInputChange = useCallback((event) => {
    event.persist();

    setInputState((prevState) => ({
      ...prevState,
      inputValue: event.target.value
    }));
  }, []);

  const onListTransitionEnd = useCallback(() => {
    if (!focus && value && !multiselect) {
      setInputState((prevState) => ({
        ...prevState,
        inputValue: inputValueExtractor(value, list)
      }));
    }
  }, [focus, inputValueExtractor, list, multiselect, value]);

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

  useMount(() => {
    documentClickHandlerRef.current = (e: { target: Node }) => {
      if (!autocompleteRef.current?.contains(e.target as Node)) {
        setListResults([]);
        setOptionState((prevState) => ({
          ...prevState,
          optionFocusedIndex: null
        }));
      }
    };

    document.addEventListener('click', documentClickHandlerRef.current as EventListener);
  });

  useUpdateOnly(() => {
    if (inputFocus) {
      if (!multiselect) {
        setListResults(
          list.filter(
            (item) =>
              inputValueExtractor(item, list).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          )
        );
      } else if (singleItemExtractor) {
        setListResults(
          list.filter(
            (item) =>
              singleItemExtractor(item).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          )
        );
      }
    }
  }, [inputFocus, inputValue, list, multiselect]);

  useUpdateOnly(() => {
    if (isOpen) {
      setListResults(list);
    } else {
      setListResults([]);
    }
  }, [isOpen]);

  useUpdateOnly(() => {
    if (listResults.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [listResults]);

  useUpdateOnly(() => {
    value &&
      setInputState((prevState) => ({
        ...prevState,
        inputValue: inputValueExtractor(value, list)
      }));
  }, [value, list]);

  useUpdateOnly(() => {
    setFocus(inputFocus || optionFocus);
  }, [inputFocus, optionFocus]);

  useUpdateOnly(() => {
    if (!focus && !multiselect) {
      setListResults([]);
      setOptionState((prevState) => ({
        ...prevState,
        optionFocusedIndex: null
      }));
    }
  }, [focus, multiselect]);

  useUpdateOnly(() => {
    if (multiselect) {
      // if (inputFocus) {
      //   setInputState((prevState) => ({
      //     ...prevState,
      //     inputValue: ''
      //   }));
      // } else {
      //   setInputState((prevState) => ({
      //     ...prevState,
      //     inputValue: inputValueExtractor(value, list)
      //   }));
      // }
    }
  }, [inputFocus, list, multiselect]);

  useUnmount(() => {
    document.removeEventListener('click', documentClickHandlerRef.current as EventListener);
  });

  return (
    <div ref={autocompleteRef} className={styles.Autocomplete}>
      <button className={styles.ArrowBtn} onClick={() => setIsOpen((prevState) => !prevState)}>
        <div className={useClass([isOpen ? styles.ArrowDown : styles.ArrowUp], [isOpen])}></div>
      </button>
      <Input
        autoComplete={autoComplete}
        disabled={disabled}
        focused={inputFocus}
        id={id}
        name={name}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        placeholder={placeholder}
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
        multiselect={multiselect}
        onChange={onOptionChange}
        onKeyDown={onOptionKeyDown}
        onTransitionEnd={onListTransitionEnd}
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
