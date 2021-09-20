export const autocomplete = {
  defaultDisplayNameExtractor: (item: { label: string }) => item.label,
  defaultKeyExtractor: (item: { label: string }) => item.label,
  defaultInputValueExtractor: (item: { label: any }) => item.label,
  defaultValueExtractor: (item: any): any => item,
  multiselectInputValueExtractor: (item: { label: string }[]) => {
    return item.reduce((accum, el, index) => {
      if (index === 0) {
        accum = el.label;
      } else {
        accum += `, ${el.label}`;
      }

      return accum;
    }, '');
  }
};

export const autocomplete2 = {
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
  defaultDisplayNameExtractor: (item: any) => item?.displayName,
  defaultKeyExtractor: (item: any) => item?.id,
  defaultInputValueExtractor: (item: any) => item?.value,
  defaultValueExtractor: (item: any) => ({ id: item?.id, value: item?.value }),
  defaultInitialValue: {
    id: 'suzuki',
    value: 'suzuki',
    displayName: 'Suziki'
  }
};
