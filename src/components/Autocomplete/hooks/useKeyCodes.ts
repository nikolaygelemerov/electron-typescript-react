import { Dispatch, KeyboardEventHandler, SetStateAction, useCallback } from 'react';

import { IOptionProps } from '../type-definitions';

const useKeyCodes = ({
  listResults,
  setOptionState
}: {
  listResults: IOptionProps[];
  setOptionState: Dispatch<
    SetStateAction<{ optionFocus: boolean; optionFocusedIndex: number | null }>
  >;
}) => {
  const moveDown = useCallback(() => {
    setOptionState((prevState) => {
      let optionFocusedIndex = prevState.optionFocusedIndex;

      if (optionFocusedIndex === null || optionFocusedIndex === listResults.length - 1) {
        optionFocusedIndex = 0;
      } else {
        optionFocusedIndex++;
      }

      return {
        ...prevState,
        optionFocusedIndex
      };
    });
  }, [listResults.length, setOptionState]);

  const moveUp = useCallback(() => {
    setOptionState((prevState) => {
      let optionFocusedIndex = prevState.optionFocusedIndex;

      if (optionFocusedIndex !== null && optionFocusedIndex !== 0) {
        optionFocusedIndex--;
      }
      return {
        ...prevState,
        optionFocusedIndex
      };
    });
  }, [setOptionState]);

  const onInputKeyDown = useCallback<KeyboardEventHandler>(
    (event) => {
      switch (event.code) {
        case 'ArrowDown':
          moveDown();
          break;

        default:
          break;
      }
    },
    [moveDown]
  );

  const onOptionKeyDown = useCallback<KeyboardEventHandler>(
    (event) => {
      switch (event.code) {
        case 'ArrowDown':
          moveDown();
          break;

        case 'ArrowUp':
          moveUp();
          break;

        default:
          break;
      }
    },
    [moveDown, moveUp]
  );

  return { onInputKeyDown, onOptionKeyDown };
};

export default useKeyCodes;
