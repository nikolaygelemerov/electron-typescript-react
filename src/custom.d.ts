declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'react-scroll-component' {
  // eslint-disable-next-line no-undef
  export default Scroll;
}

type TChildren = (() => JSX.Element | JSX.Element[]) | JSX.Element | JSX.Element[] | null;

interface IPerformanceMetric {
  label: string;
  shortLabel: string;
  group: string;
  type: string;
  fields: string[];
  color: string;
}

interface IPerformanceCategory {
  name: string;
  label: string;
  path: string;
  metrics: IPerformanceMetric[];
}
