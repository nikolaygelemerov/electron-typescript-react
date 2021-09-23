import { FC, memo, useCallback } from 'react';

import { Autocomplete } from '@components';
import { usePerformance } from '@providers';
import { autocomplete, SCHEMA } from '@services';

import styles from './Main.scss';

const Main: FC = () => {
  const {
    actions: { setCategory, setMetric, unsetMetric },
    state: { category, metrics }
  } = usePerformance();

  const onMetricChange = useCallback(
    (value: IPerformanceMetric) => {
      if (metrics.some((item) => item === value)) {
        unsetMetric(value);
      } else {
        setMetric(value);
      }
    },
    [metrics, setMetric, unsetMetric]
  );

  return (
    <>
      <aside className={styles.Sidebar}>
        <Autocomplete.Autocomplete
          id="category"
          displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
          hideScroll
          inputValueExtractor={autocomplete.defaultInputValueExtractor}
          Input={Autocomplete.Input.Standard}
          keyExtractor={autocomplete.defaultKeyExtractor}
          list={SCHEMA}
          Option={Autocomplete.Option.Standard}
          onChange={setCategory}
          name="category"
          rowsToDisplay={3}
          value={category}
          valueExtractor={autocomplete.defaultValueExtractor}
        />
        <br />
        <Autocomplete.Autocomplete
          key={category.label}
          id="metrics"
          displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
          inputValueExtractor={autocomplete.multiselectInputValueExtractor}
          Input={Autocomplete.Input.Standard}
          keyExtractor={autocomplete.defaultKeyExtractor}
          list={category.metrics}
          Option={Autocomplete.Option.Standard}
          onChange={onMetricChange}
          multiselect
          name="metrics"
          placeholder={`${category.label} metrics`}
          rowsToDisplay={4}
          singleItemExtractor={autocomplete.defaultInputValueExtractor}
          value={metrics}
          valueExtractor={autocomplete.defaultValueExtractor}
        />
      </aside>
      <section className={styles.Main}></section>
    </>
  );
};

export default memo(Main);
