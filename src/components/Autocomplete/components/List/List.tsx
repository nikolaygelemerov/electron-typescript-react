import React, { createRef, FC, memo, RefObject, useMemo, useState } from 'react';
import Scroll from 'react-scroll-component';

import { usePrevious, useUpdate, useUpdateOnly } from '@services';

import { IListProps } from '../../type-definitions';
import styles from './List.scss';

const SCROLLER_OPTIONS = {
  className: styles.ScrollerContainer,
  direction: 'vertical',
  scrollerClass: styles.Scroller
};

const List: FC<IListProps> = ({
  displayNameExtractor,
  inputValueExtractor,
  keyExtractor,
  list,
  multiselect,
  onChange,
  onKeyDown,
  Option,
  optionFocusedIndex,
  onTransitionEnd,
  rowsToDisplay,
  toggleOptionFocus,
  value,
  valueExtractor
}) => {
  const [style, setStyle] = useState({ height: 0, maxHeight: 0 });
  const [listToRender, setListToRender] = useState(list);

  const [rowRefs, setRowRefs] = useState<RefObject<HTMLButtonElement>[]>([]);

  const prevList = usePrevious(list);

  const scrollerOptions = useMemo(() => {
    return {
      ...SCROLLER_OPTIONS,
      height: style.maxHeight
    };
  }, [style.maxHeight]);

  useUpdate(() => {
    setRowRefs(listToRender.map(() => createRef()));
  }, [listToRender]);

  useUpdate(() => {
    const rowHeight = (rowRefs && rowRefs[0]?.current?.clientHeight) ?? null;

    setStyle((prevStyle) => ({
      ...prevStyle,
      height: rowHeight !== null ? list.length * rowHeight : 0,
      ...(rowHeight !== null && prevStyle.maxHeight === 0
        ? { maxHeight: rowsToDisplay * rowHeight }
        : {})
    }));
  }, [rowRefs, list]);

  useUpdate(() => {
    typeof optionFocusedIndex === 'number' && rowRefs[optionFocusedIndex]?.current?.focus();
  }, [optionFocusedIndex]);

  useUpdateOnly(() => {
    if (list.length === 0) {
      setStyle((prevStyle) => ({ ...prevStyle, height: 0 }));
    } else if (list.length >= prevList.length) {
      setListToRender(list);
    } else {
      setListToRender(prevList);
    }
  }, [list, prevList]);

  return (
    <div
      className={styles.List}
      style={style}
      onTransitionEnd={(event) => {
        setStyle((prevStyle) => ({
          ...prevStyle
          // Remove native scroll
          // overflowY: list.length > rowsToDisplay ? 'auto' : 'hidden'
        }));

        if (list.length < prevList.length) {
          setListToRender(list);
        }

        onTransitionEnd && onTransitionEnd(event);
      }}
    >
      <Scroll {...scrollerOptions}>
        {listToRender.map((item, index) => {
          return item && rowRefs[index] ? (
            <Option
              ref={rowRefs[index]}
              displayName={displayNameExtractor(item)}
              key={keyExtractor(item)}
              isSelected={
                multiselect
                  ? value.some((el: IPerformanceMetric) => el === item)
                  : inputValueExtractor(value) === inputValueExtractor(item)
              }
              onChange={onChange}
              onKeyDown={onKeyDown}
              toggleFocus={toggleOptionFocus}
              value={valueExtractor(item)}
            />
          ) : null;
        })}
      </Scroll>
    </div>
  );
};

export default memo(List);
