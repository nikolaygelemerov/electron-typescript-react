export interface IHeightTransitionBox {
  children?: TChildren;
  onTransitionEnd?: Function | null;
  persistChildrenOnCollapse?: boolean;
  transtionDuration?: number;
  transitionType?: string;
}
