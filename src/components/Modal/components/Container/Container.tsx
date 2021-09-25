import { FC, memo, useCallback, useMemo, useState } from 'react';

import { Icons } from '@components';
import { useClass } from '@services';

import { useModal } from '../../context';
import { IModal } from '../../type-definitions';

import styles from './Container.scss';

const Container: FC<IModal> = (props) => {
  const {
    children,
    containerClass,
    content,
    contentClass,
    id,
    onClose,
    preventModalBackdropClick
  } = props;

  const {
    actions: { hideModalById, setModal },
    orderList
  } = useModal();

  const [isClosed, setIsClosed] = useState(false);

  const onCloseHandler = useCallback(() => {
    hideModalById({ id });
    onClose && onClose();
    setIsClosed(true);
  }, [hideModalById, id, onClose]);

  const onBackdropCloseHandler = useCallback(
    (event) => {
      if (
        typeof event.target.className?.indexOf === 'function' &&
        event.target.className.indexOf(styles.Container) !== -1
      ) {
        onCloseHandler();
      }
    },
    [onCloseHandler]
  );

  const onAnimationEndHandler = useCallback(() => {
    if (orderList.length === 0) {
      setModal({ id });
    }
  }, [id, orderList.length, setModal]);

  const renderChildrenContent = useMemo(() => {
    const output = children || content || null;

    const renderOutput =
      typeof output === 'function' ? output({ ...props, onClose: onCloseHandler }) : output;

    return renderOutput;
  }, [children, content, props, onCloseHandler]);

  return (
    <div
      className={useClass(
        [styles.Container, containerClass, isClosed && styles.ContainerClose],
        [containerClass, isClosed]
      )}
      onClick={(event) => {
        !preventModalBackdropClick && onBackdropCloseHandler(event);
      }}
      onAnimationEnd={onAnimationEndHandler}
    >
      <section className={useClass([styles.Content, contentClass], [contentClass])}>
        <button className={styles.CloseIcon} onClick={onCloseHandler} type="button">
          <Icons.Close />
        </button>
        {renderChildrenContent}
      </section>
    </div>
  );
};

export default memo(Container);
