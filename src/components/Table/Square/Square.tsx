import styles from './Square.module.scss';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

type Props = {
  isBlue: boolean,
  isLarge: boolean,
  onHover: (rowIndex: number, columnIndex: number) => void,
  row: number,
  column: number,
}

export const Square: React.FC<Props> = ({
  isBlue,
  isLarge,
  row,
  column,
  onHover,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const element = ref.current;

    element?.addEventListener('mouseenter', (event) => {
      event.stopImmediatePropagation();
      onHover(row, column);
    });
    return () => {
      element?.removeEventListener('mouseenter', () => console.log('dismounted'));
    };
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(styles.square,
        {
          [styles.color__blue]: isBlue,
          [styles.square__large]: !isLarge,
          [styles.square__small]: isLarge,
        })}
    />
  )
};