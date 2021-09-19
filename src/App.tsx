import { FC, memo, useEffect } from 'react';

import { Main } from '@pages';
import { PerformanceProvider } from '@providers';

import styles from './App.scss';

const App: FC = () => {
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  return (
    <PerformanceProvider>
      <main className={styles.App}>
        <Main />
      </main>
    </PerformanceProvider>
  );
};

export default memo(App);
