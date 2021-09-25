import { FC, memo } from 'react';

import { useClass } from '@services';
import colors from '@styles/shared/_variables.scss';

console.log('colors: ', colors);

import styles from './Close.scss';

export const Close: FC<ISvgIcon> = ({ className, fill, height, width, ...otherProps }) => {
  return (
    <svg
      className={useClass(['feather', 'feather-x-square', styles.Close, className], [className])}
      xmlns="http://www.w3.org/2000/svg"
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill={fill || colors.color_10_brand}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      <line x1="15" y1="9" x2="9" y2="15"></line>
    </svg>
  );
};

export default memo(Close);
