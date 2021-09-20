import { FC, memo } from 'react';

import { Main } from '@pages';
import { PerformanceProvider } from '@providers';

import styles from './App.scss';

const App: FC = () => {
  return (
    <PerformanceProvider>
      <main className={styles.App}>
        <Main />
      </main>
    </PerformanceProvider>
  );
};

export default memo(App);
