import { FC, memo, useEffect } from 'react';

import styles from './App.scss';

const App: FC = () => {
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  return (
    <main className={styles.App}>
      <h1>App</h1>
    </main>
  );
};

export default memo(App);
