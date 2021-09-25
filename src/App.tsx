import { FC, memo } from 'react';

import { ModalProvider } from '@components';
import { PollManager } from '@managers';
import { Main } from '@pages';
import { Metricsrovider, PerformanceProvider } from '@providers';

import styles from './App.scss';

const App: FC = () => {
  return (
    <ModalProvider>
      <Metricsrovider>
        <PerformanceProvider>
          <PollManager />
          <main className={styles.App}>
            <Main />
          </main>
        </PerformanceProvider>
      </Metricsrovider>
    </ModalProvider>
  );
};

export default memo(App);
