import styles from './Table.module.scss';
import React, { useEffect, useState } from 'react';
import { generateKey } from '../../utils/generateKey';
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

  return (
    <div className={styles.table}>
      {squares.map((value, rowIndex) => {
          return <div className={styles.table__row} key={generateKey(rowIndex)}>
            {value.map((square, columnIndex) => (
              <Square
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