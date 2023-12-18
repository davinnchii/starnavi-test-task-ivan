import styles from './Table.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Square } from './Square/Square';
import { generateTable } from '../../utils/generateTable';

type Props = {
  field: number,
  onMove: (position: string) => void,
}

export const Table: React.FC<Props> = ({ field, onMove }) => {
  const [squares, setSquares] = useState(generateTable(field));

  useEffect(() => {
    setSquares(generateTable(field));
  }, [field]);

  const onHover = useCallback((row: number, column: number) => {
    setSquares(prevState => {
      const newState = prevState.map((rowArray, rowIndex) => {
        if (rowIndex === row) {
          return rowArray.map((square, columnIndex) => {
            if (columnIndex === column) {
              return { ...square, value: !square.value };
            }
            return square;
          })
        }
        return rowArray;
      })
      return (newState);
    });
    onMove(`row ${row} column ${column}`);
  }, [field]);

  return (
    <div className={styles.table}>
      {squares.map((value, rowIndex) => {
          return <div className={styles.table__row} key={rowIndex}>
            {value.map((square, columnIndex) => (
              <Square
                isBlue={square.value}
                key={square.id}
                onHover={onHover}
                isLarge={field > 15}
                row={rowIndex}
                column={columnIndex}
              />
            ))}
          </div>
        }
      )}
    </div>
  )
}