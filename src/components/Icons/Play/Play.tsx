import { FC, memo } from 'react';

import { useClass } from '@services';

import styles from './Play.scss';

export const Play: FC<ISvgIcon> = ({ className, fill, height, width, ...otherProps }) => {
  return (
    <svg
      className={useClass(['feather', 'feather-play', styles.Close, className], [className])}
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
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
};

export default memo(Play);
