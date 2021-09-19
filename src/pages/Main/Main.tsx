import { FC, memo } from 'react';

import { Autocomplete } from '@components';
import { autocomplete } from '@services';

const Main: FC = () => {
  return (
    <Autocomplete.Autocomplete
      id="cars"
      displayNameExtractor={autocomplete.defaultDisplayNameExtractor}
      inputValueExtractor={autocomplete.defaultInputValueExtractor}
      Input={Autocomplete.Input.Standard}
      keyExtractor={autocomplete.defaultKeyExtractor}
      list={autocomplete.defaultList}
      Option={Autocomplete.Option.Standard}
      onChange={() => {}}
      name="cars"
      value={autocomplete.defaultInitialValue}
      valueExtractor={autocomplete.defaultValueExtractor}
    />
  );
};

export default memo(Main);
