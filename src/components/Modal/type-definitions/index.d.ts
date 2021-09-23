export interface IModalProps {
  children: TChildren;
  id: string;
}

export interface IModal {
  clearPreceeding?: boolean;
  containerClass?: string;
  content?: JSX.Element | Function;
  contentClass?: string;
  draggable?: boolean;
  forceShow?: boolean;
  hideModal?: Function;
  id: string;
  local?: boolean;
  onClose?: Function;
  overShow?: boolean;
  preventModalBackdropClick?: boolean;
  size?: string;
  type?: string;
  view?: string;
  withCenterFollow?: boolean;
  withDragUnderlay?: boolean;
  withInnerScroll?: boolean;
  withTransition?: boolean;
}

export interface IModalContext {
  actions: { [key: string]: Function };
  modalsToShow: { [key: string]: IModal };
  orderList: IModal[];
}

export interface IStyleDeclaration extends CSSStyleDeclaration {
  [key: string]: string;
}
