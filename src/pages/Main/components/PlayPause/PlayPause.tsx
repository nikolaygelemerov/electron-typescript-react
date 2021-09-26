import { memo } from 'react';

import { usePerformance } from '@providers';
import { useClass } from '@services';

import styles from './PlayPause.scss';

const PlayPause = () => {
  const {
    actions: { setPerformancePause },
    state: { performancePause }
  } = usePerformance();

  console.log('performancePause: ', performancePause);

  return (
    <button
      className={useClass(
        [styles.PlayPause, performancePause ? styles.Pause : styles.Play],
        [performancePause]
      )}
      onClick={() => setPerformancePause(!performancePause)}
      type="button"
    >
      {performancePause ? 'Play' : 'Pause'}
    </button>
  );
};

export default memo(PlayPause);
