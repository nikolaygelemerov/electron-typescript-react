import { AnimationEventHandler } from 'react';

export interface IModal {
  children?: TChildren;
  clearPreceeding?: boolean;
  closeContainerClass?: string;
  containerClass?: string;
  content?: JSX.Element | Function;
  contentClass?: string;
  forceShow?: boolean;
  hideModal?: Function;
  id: string;
  onClose?: Function;
  onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
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
