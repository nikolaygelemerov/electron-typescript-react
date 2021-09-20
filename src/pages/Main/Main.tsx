import { FC, memo, useCallback } from 'react';

import { Autocomplete } from '@components';
import { usePerformance } from '@providers';
import { autocomplete, SCHEMA } from '@services';

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
      <Autocomplete.Autocomplete
        id="category"
        displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
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
        placeholder={'Metrics'}
        rowsToDisplay={4}
        singleItemExtractor={autocomplete.defaultInputValueExtractor}
        value={metrics}
        valueExtractor={autocomplete.defaultValueExtractor}
      />
    </>
  );
};

export default memo(Main);
