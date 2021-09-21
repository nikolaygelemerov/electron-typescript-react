export const autocomplete = {
  defaultDisplayNameExtractor: (item: { label: string }) => item.label,
  defaultKeyExtractor: (item: { label: string }) => item.label,
  defaultInputValueExtractor: (item: { label: any }) => item.label,
  defaultValueExtractor: (item: any): any => item,
  multiselectInputValueExtractor: (value: { label: string }[], list: { label: string }[]) => {
    const itemsInList: { label: string }[] = [];

    value.forEach((item) => {
      if (list.includes(item)) {
        itemsInList.push(item);
      }
    });

    return itemsInList.reduce((accum, el, index) => {
      if (index === 0) {
        accum = el.label;
      } else {
        accum += `, ${el.label}`;
      }

      return accum;
    }, '');
  }
};
