import { FC, memo, useCallback } from 'react';

import { Autocomplete, Icons, useModal } from '@components';
import { useMetrics } from '@providers';
import { autocomplete, SCHEMA } from '@services';

import { PerformanceBoard } from './components';

import styles from './Main.scss';

const Main: FC = () => {
  const {
    actions: { setCategory, setMetric, unsetMetric },
    state: { category, metrics }
  } = useMetrics();

  const {
    actions: { showModalById }
  } = useModal();

  const onMetricChange = useCallback(
    (value: IMetric) => {
      if (metrics.some((item) => item === value)) {
        unsetMetric(value);
      } else {
        if (metrics.length === 3) {
          showModalById({
            id: 'Metrics_select_warning',
            content: (
              <p className={styles.ModalWarn}>
                <Icons.Warn />
                <span>Cannot select more than 3 metrics</span>
              </p>
            ),
            contentClass: styles.ModalContentClass
          });
        } else {
          setMetric(value);
        }
      }
    },
    [metrics, setMetric, showModalById, unsetMetric]
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
      <PerformanceBoard />
    </>
  );
};

export default memo(Main);
