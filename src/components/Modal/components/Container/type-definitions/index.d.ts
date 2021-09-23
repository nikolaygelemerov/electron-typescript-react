import { IModal } from '../../../type-definitions';

interface IContainerProps extends IModal {
  children?: TChildren;
  hideModal: Function;
}
