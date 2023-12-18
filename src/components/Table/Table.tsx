import styles from './Table.module.scss';
import React, { memo, useEffect, useRef, useState } from 'react';
import { generateKey } from '../../utils/generateKey';
import { Square } from './Square/Square';
import { generateTable } from '../../utils/generateTable';

type Props = {
  field: number,
  onMove: (position: string) => void,
}

const MemoizedSquare = memo(Square);

export const Table: React.FC<Props> = ({ field, onMove }) => {
  const [squares, setSquares] = useState(generateTable(field));

  useEffect(() => {
    setSquares(generateTable(field));
  }, [field]);

  const move = useRef({
    row: -1,
    column: -1,
  });

  const onMouseLeave = () => {
    move.current = { row: -1, column: -1 };
  }

  const handleHoverOnSquare = (rowIndex: number, columnIndex: number) => {
    setSquares(prevState => {
      return prevState.map((row, rowNumber) => {
        if (rowIndex === rowNumber) {
          return row.map((column, columnNumber) => {
            if (columnNumber === columnIndex) {
              onMove(`row ${rowIndex} column ${columnIndex}`);
              return !column;
            }

            return column;
          })
        }

        return row;
      });
    });
  }

  return (
    <div className={styles.table}>
      {squares.map((value, rowIndex) => {
          return <div className={styles.table__row} key={generateKey(rowIndex)}>
            {value.map((square, columnIndex) => (
              <MemoizedSquare
                isBlue={square}
                key={generateKey(columnIndex)}
                onHover={(rowIndex, columnIndex) => onMove(`row ${rowIndex} column ${columnIndex}`)}
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