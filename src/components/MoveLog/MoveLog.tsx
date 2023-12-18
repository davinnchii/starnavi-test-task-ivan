import styles from './MoveLog.module.scss';
import React from 'react';

type Props = {
  moves: string[]
}

export const MoveLog: React.FC<Props> = ({ moves }) => {
  return (
    <div className={styles.moveLog}>
      <h3>Hover squares</h3>
      {moves.map(move => (
        <p className={styles.moveLog__move} key={`${move} ${Math.random() * 100}`}>{move}</p>
      ))}
    </div>
  )
}