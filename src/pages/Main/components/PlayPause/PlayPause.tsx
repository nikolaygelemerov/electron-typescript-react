import { memo } from 'react';

import { Icons } from '@components';
import { usePerformance } from '@providers';
import { useClass } from '@services';

import styles from './PlayPause.scss';

const PlayPause = () => {
  const {
    actions: { setPerformancePause },
    state: { performancePause }
  } = usePerformance();

  return (
    <button
      className={useClass(
        [styles.PlayPause, performancePause ? styles.Pause : styles.Play],
        [performancePause]
      )}
      onClick={() => setPerformancePause(!performancePause)}
      type="button"
    >
      {performancePause ? (
        <>
          <Icons.Play />
          <span>Play</span>
        </>
      ) : (
        <>
          <Icons.Pause />
          <span>Pause</span>
        </>
      )}
    </button>
  );
};

export default memo(PlayPause);
