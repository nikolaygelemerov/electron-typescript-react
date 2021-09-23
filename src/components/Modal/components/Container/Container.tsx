import { FC, memo, useCallback } from 'react';

import { useClass } from '@services';

import { IContainerProps } from './type-definitions';

import styles from './Container.scss';

const Container: FC<IContainerProps> = (props) => {
  const {
    children,
    containerClass,
    content,
    contentClass,
    hideModal,
    onClose,
    preventModalBackdropClick
  } = props;

  const onBackdropCloseHandler = useCallback(
    (event) => {
      if (
        typeof event.target.className?.indexOf === 'function' &&
        (event.target.className.indexOf(styles.Container) !== -1 ||
          event.target.className.indexOf(styles.Content) !== -1)
      ) {
        hideModal();
        typeof onClose === 'function' && onClose();
      }
    },
    [hideModal, onClose]
  );

  const onCloseHandler = useCallback(() => {
    hideModal();
    typeof onClose === 'function' && onClose();
  }, [hideModal, onClose]);

  const renderChildrenContent = useCallback(() => {
    const output = children || content || null;

    const renderOutput =
      typeof output === 'function' ? output({ ...props, onClose: onCloseHandler }) : output;
    console.log('renderOutput: ', renderOutput);
    return renderOutput;
  }, [children, content, props, onCloseHandler]);

  return (
    <div
      className={useClass([styles.Container, containerClass], [containerClass])}
      onClick={(event) => {
        !preventModalBackdropClick && onBackdropCloseHandler(event);
      }}
    >
      <section className={useClass([styles.Content, contentClass], [contentClass])}>
        <div className={styles.InnerScrollContent}>{<div>Hello</div>}</div>
      </section>
    </div>
  );
};

export default memo(Container);
