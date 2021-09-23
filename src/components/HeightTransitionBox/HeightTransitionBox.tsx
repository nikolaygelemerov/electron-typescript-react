import { FC, memo, RefObject, useCallback, useRef, useState } from 'react';

import { useMutationObserver } from '@services';

import { IHeightTransitionBox } from './type-definitions';

const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

const HeightTransitionBox: FC<IHeightTransitionBox> = ({
  children,
  onTransitionEnd,
  transtionDuration,
  transitionType
}) => {
  const contentRef = useRef<HTMLElement>(null);

  const [, setRender] = useState({});

  const observerCallback = useCallback(() => {
    setRender({});
  }, []);

  useMutationObserver({
    callback: observerCallback,
    config: MUTATION_OBSERVER_CONFIG,
    target: contentRef
  });

  return (
    <div
      onTransitionEnd={(event) => {
        event.stopPropagation();

        if (event.propertyName == 'height') {
          onTransitionEnd && onTransitionEnd(event);
          observerCallback();
        }
      }}
      style={{
        height: contentRef.current?.offsetHeight,
        overflow: 'hidden',
        transition: `height ${
          typeof transtionDuration !== 'undefined' ? transtionDuration : 300
        }ms ${typeof transitionType !== 'undefined' ? transitionType : 'ease-in-out'}`
      }}
    >
      <div data-test="height-trainsition-box" ref={contentRef as RefObject<HTMLDivElement>}>
        {children}
      </div>
    </div>
  );
};

export default memo(HeightTransitionBox);
