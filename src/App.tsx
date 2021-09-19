import { FC, memo, useEffect } from 'react';

import { Main } from '@pages';

import styles from './App.scss';

const App: FC = () => {
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  return (
    <main className={styles.App}>
      <Main />
    </main>
  );
};

export default memo(App);
