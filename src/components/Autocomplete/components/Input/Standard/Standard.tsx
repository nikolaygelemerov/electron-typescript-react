import React, { FC, memo } from 'react';

import { useClass } from '@services';

import { IInputProps } from '../../../type-definitions';
import styles from './Standard.scss';

const Standard: FC<IInputProps> = ({
  autoComplete = 'off',
  disabled,
  focused,
  id,
  name,
  onChange,
  onKeyDown,
  toggleFocus,
  touched,
  valid,
  validating,
  value
}) => {
  return (
    <input
      autoComplete={autoComplete}
      className={useClass(
        [
          styles.Standard,
          touched && !focused && !valid && !validating && styles.Error,
          (focused || value) && styles.Active,
          touched && !focused && !validating && !valid && !value && styles.Empty
        ],
        [focused, touched, valid, validating]
      )}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={() => {
        toggleFocus(false);
      }}
      onChange={onChange}
      onFocus={() => {
        toggleFocus(true);
      }}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};

export default memo(Standard);
