import { FC, memo } from 'react';

import { ModalProvider } from '@components';
import { Main } from '@pages';
import { PerformanceProvider } from '@providers';

import styles from './App.scss';

const App: FC = () => {
  return (
    <ModalProvider>
      <PerformanceProvider>
        <main className={styles.App}>
          <Main />
        </main>
      </PerformanceProvider>
    </ModalProvider>
  );
};

export default memo(App);
