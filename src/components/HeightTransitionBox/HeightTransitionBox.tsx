import { FC, memo, RefObject, useCallback, useRef, useState } from 'react';

import { useMutationObserver, usePrevious, useUpdateOnly } from '@services';

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
  persistChildrenOnCollapse,
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

  const isTransitioningRef = useRef(false);

  const [childrenToRender, setChildrenToRender] = useState(children);
  const prevChildren = usePrevious(children);
  const prevHeight = usePrevious(contentRef.current?.offsetHeight);

  useUpdateOnly(async () => {
    if (!persistChildrenOnCollapse) return;

    if (
      prevHeight &&
      contentRef.current?.offsetHeight &&
      prevHeight > contentRef.current?.offsetHeight
    ) {
      if (isTransitioningRef.current === false) {
        isTransitioningRef.current = true;
        setChildrenToRender(prevChildren);
      }
    } else {
      setChildrenToRender(children);
    }
  }, [contentRef.current?.offsetHeight]);

  return (
    <div
      onTransitionEnd={(event) => {
        event.stopPropagation();

        if (event.propertyName == 'height') {
          onTransitionEnd && onTransitionEnd(event);
          observerCallback();

          if (!persistChildrenOnCollapse) return;

          if (isTransitioningRef.current === true) {
            isTransitioningRef.current = false;
            setChildrenToRender(children);
          }
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
      <div
        ref={contentRef as RefObject<HTMLDivElement>}
        style={{
          position: 'relative'
        }}
      >
        {persistChildrenOnCollapse ? (
          <>
            <div style={{ visibility: 'hidden' }}>{children}</div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            >
              {childrenToRender}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default memo(HeightTransitionBox);
