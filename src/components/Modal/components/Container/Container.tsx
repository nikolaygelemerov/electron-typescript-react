import { AnimationEventHandler, FC, memo, useCallback, useMemo, useState } from 'react';

import { useClass, useUpdate } from '@services';

import { IModal } from '../../type-definitions';

import styles from './Container.scss';

const Container: FC<IModal> = (props) => {
  const {
    children,
    closeContainerClass,
    containerClass,
    content,
    contentClass,
    hideModal,
    onClose,
    onAnimationEnd,
    preventModalBackdropClick
  } = props;

  const [containerClasses, setContainerClasses] = useState<string[]>([styles.Container]);

  const onCloseHandler = useCallback(() => {
    hideModal && hideModal();
    onClose && onClose();

    setContainerClasses((prevState) => [...prevState, closeContainerClass as string]);
  }, [closeContainerClass, hideModal, onClose]);

  const onBackdropCloseHandler = useCallback(
    (event) => {
      if (
        typeof event.target.className?.indexOf === 'function' &&
        (event.target.className.indexOf(styles.Container) !== -1 ||
          event.target.className.indexOf(styles.Content) !== -1)
      ) {
        onCloseHandler();
      }
    },
    [onCloseHandler]
  );

  const renderChildrenContent = useMemo(() => {
    const output = children || content || null;

    const renderOutput =
      typeof output === 'function' ? output({ ...props, onClose: onCloseHandler }) : output;

    return renderOutput;
  }, [children, content, props, onCloseHandler]);

  useUpdate(() => {
    setContainerClasses((prevState) => [...prevState, containerClass as string]);
  }, [containerClass]);

  console.log('containerClasses: ', containerClasses);

  return (
    <div
      className={useClass(containerClasses, [containerClasses])}
      onClick={(event) => {
        !preventModalBackdropClick && onBackdropCloseHandler(event);
      }}
      onAnimationEnd={onAnimationEnd as AnimationEventHandler<HTMLDivElement>}
    >
      <section className={useClass([styles.Content, contentClass], [contentClass])}>
        {renderChildrenContent}
      </section>
    </div>
  );
};

export default memo(Container);
