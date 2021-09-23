import { FC, memo, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useUpdateOnly } from '@services';

import { ModalContext } from './context';
import { Container } from './components';

const ModalArena: FC = () => {
  const {
    modalsToShow,
    orderList,
    actions: { hideModalById, setModal }
  } = useContext(ModalContext);

  const modalEl = document.querySelector('#modal') as HTMLElement;
  const appEl = document.querySelector('#root') as HTMLElement;
  const appStyle = useRef<CSSStyleDeclaration>(appEl?.style);

  useUpdateOnly(() => {
    if (orderList.length) {
      orderList.forEach(({ id }) => {
        setModal({ id });
      });
    }
  }, [orderList, setModal]);

  useUpdateOnly(() => {
    if (Object.keys(modalsToShow).length) {
      appStyle.current.filter = 'blur(2px)';
    } else {
      appStyle.current.filter = 'none';
    }
  }, [modalsToShow]);

  return (
    <>
      {Object.keys(modalsToShow).map((modalName) => {
        const { id, local, ...otherProps } = modalsToShow[modalName];

        return modalEl && !local
          ? ReactDOM.createPortal(
              <Container
                key={modalName}
                hideModal={() => {
                  hideModalById({ id });
                }}
                id={id}
                {...otherProps}
              />,
              modalEl
            )
          : null;
      })}
    </>
  );
};

export default memo(ModalArena);
