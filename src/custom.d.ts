declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'react-scroll-component' {
  // eslint-disable-next-line no-undef
  export default Scroll;
}

type TChildren = (() => JSX.Element | JSX.Element[]) | JSX.Element | JSX.Element[] | null;

interface IMetric {
  label: string;
  shortLabel: string;
  group: string;
  type: string;
  fields: string[];
  category: string;
  color: string;
}

interface IMetricCategory {
  name: string;
  label: string;
  path: string;
  metrics: IMetric[];
}

interface IPerformanceMetric {
  color: string;
  label: string;
  metricChartDomain: [number, number];
  metricChartTypeAxisColor: string;
  type: string;
  value: number | string;
}

interface ISvgIcon {
  className?: string;
  fill?: string;
  height?: string;
  width?: string;
}
