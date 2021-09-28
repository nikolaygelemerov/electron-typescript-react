import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Pause.scss';

export const Pause: FC<ISvgIcon> = ({ className, fill, height, width, ...otherProps }) => {
  return (
    <svg
      className={useClass(['feather', 'feather-pause', styles.Close, className], [className])}
      xmlns="http://www.w3.org/2000/svg"
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  );
};

export default memo(Pause);
