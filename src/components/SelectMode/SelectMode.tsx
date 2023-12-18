import React, { useState } from 'react';
import { ModeType } from '../../types/ModeType';
import styles from './SelectMode.module.scss';

type Props = {
  availableMods: ModeType[] | null,
  onModeChange: (newMode: string) => void,
}

export const SelectMode: React.FC<Props> = ({ availableMods, onModeChange }) => {
  const [modeName, setModeName] = useState('');

  return (
    <div className={styles.selectMode}>
      <select
        aria-label="Select a game mode"
        className={styles.selectMode__select}
        value={modeName}
        onChange={(e) => setModeName(e.target.value)}
      >
        <option value="" disabled>Pick a mode</option>
        {availableMods?.map(mode => (
          <option value={mode.name} key={mode.id}>{mode.name}</option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onModeChange(modeName)}
      >
        START
      </button>
    </div>
  )
}