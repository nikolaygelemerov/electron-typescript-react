export interface IModal {
  children?: TChildren;
  clearPreceeding?: boolean;
  containerClass?: string;
  content?: JSX.Element | Function;
  contentClass?: string;
  forceShow?: boolean;
  id: string;
  onClose?: Function;
  overShow?: boolean;
  preventModalBackdropClick?: boolean;
}

export interface IModalContext {
  actions: { [key: string]: Function };
  modalsToShow: { [key: string]: IModal };
  orderList: IModal[];
}

export interface IStyleDeclaration extends CSSStyleDeclaration {
  [key: string]: string;
}
