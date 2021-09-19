import { FC, memo } from 'react';

import { Autocomplete } from '@components';
import { usePerformance } from '@providers';
import { autocomplete } from '@services';

const Main: FC = () => {
  const {
    state: { category }
  } = usePerformance();

  console.log('category: ', category);

  return (
    <>
      <Autocomplete.Autocomplete
        id="category"
        displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
        inputValueExtractor={autocomplete.defaultInputValueExtractor}
        Input={Autocomplete.Input.Standard}
        keyExtractor={autocomplete.defaultKeyExtractor}
        list={category.metrics}
        Option={Autocomplete.Option.Standard}
        onChange={() => {}}
        name="cars"
        value={category.label}
        valueExtractor={autocomplete.defaultValueExtractor}
      />
      <br />
      <Autocomplete.Autocomplete
        id="category"
        displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
        inputValueExtractor={autocomplete.defaultInputValueExtractor}
        Input={Autocomplete.Input.Standard}
        keyExtractor={autocomplete.defaultKeyExtractor}
        list={category.metrics}
        Option={Autocomplete.Option.Standard}
        onChange={() => {}}
        name="cars"
        value={category.label}
        valueExtractor={autocomplete.defaultValueExtractor}
      />
    </>
  );
};

export default memo(Main);
