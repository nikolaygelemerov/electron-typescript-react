import React, { forwardRef, memo } from 'react';

import { useClass } from '@services';

import { IOptionProps } from '../../../type-definitions';
import styles from './Standard.scss';

const Standard = forwardRef<HTMLButtonElement, IOptionProps>(
  ({ displayName, isSelected, onChange, onKeyDown, toggleFocus, value }, ref) => {
    return (
      <button
        ref={ref}
        className={useClass([styles.Standard, isSelected && styles.Selected], [isSelected])}
        onBlur={() => {
          toggleFocus(false);
        }}
        onClick={() => {
          typeof onChange === 'function' && onChange(value);
        }}
        onFocus={() => {
          toggleFocus(true);
        }}
        onKeyDown={onKeyDown}
        type="button"
      >
        {displayName}
      </button>
    );
  }
);

export default memo(Standard);
