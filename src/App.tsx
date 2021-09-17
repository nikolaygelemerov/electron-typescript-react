import { FC, memo } from 'react';

import styles from './App.scss';

const App: FC = () => {
  return (
    <main className={styles.App}>
      <h1>App</h1>
    </main>
  );
};

export default memo(App);
