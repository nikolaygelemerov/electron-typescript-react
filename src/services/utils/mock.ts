/* eslint-disable @typescript-eslint/no-explicit-any */
export const autocomplete = {
  defaultList: [
    { id: 'bmw', value: 'bmw', displayName: 'BMW' },
    { id: 'mercedes', value: 'mercedes', displayName: 'Mercedes' },
    { id: 'subaru', value: 'subaru', displayName: 'Subaru' },
    { id: 'suzuki', value: 'suzuki', displayName: 'Suziki' },
    { id: 'honda', value: 'honda', displayName: 'Honda' },
    { id: 'mazda', value: 'mazda', displayName: 'Mazda' },
    { id: 'lada', value: 'lada', displayName: 'Lada' },
    { id: 'audi', value: 'audi', displayName: 'Audi' },
    { id: 'ferrari', value: 'ferrari', displayName: 'Ferrari' },
    { id: 'scoda', value: 'scoda', displayName: 'Scoda' }
  ],
  defaultDisplayNameExtractor: (item: { displayName: string }): string => item.displayName,
  defaultKeyExtractor: (item: { id: string }): string => item?.id,
  defaultInputValueExtractor: (item: { value: any }): any => item?.value,
  defaultValueExtractor: (item: {
    id: string;
    value: unknown;
  }): { id: string; value: unknown } => ({
    id: item?.id,
    value: item?.value
  }),
  defaultInitialValue: {
    id: 'suzuki',
    value: 'suzuki',
    displayName: 'Suziki'
  }
};
