import React, { memo, useCallback, useEffect, useState } from 'react';
import './App.scss';
import { SelectMode } from './components/SelectMode/SelectMode';
import { Table } from './components/Table/Table';
import { MoveLog } from './components/MoveLog/MoveLog';
import { ModeType } from './types/ModeType';
import { request } from './utils/fetchClient';

const MemoizedSquare = memo(Table);

function App() {
  const [availableMods, setAvailableMods] = useState<ModeType[] | null>(null);
  const [currentMode, setCurrentMode] = useState<ModeType | null>(null);
  const [moveHistory, setMoveHistory] = useState([] as string[]);


  useEffect(() => {
    request<ModeType[]>()
      .then(setAvailableMods);
  }, []);

  useEffect(() => {
    setMoveHistory([] as string[]);
  }, [currentMode]);

  const handleChangeMode = (modeName: string) => {
    const newMode = availableMods?.find(({ name }) => name === modeName) || null;

    setCurrentMode(newMode);
  };

  const handleAddMoveToLog = useCallback((position: string) => {
    setMoveHistory(prevState => ([...prevState, position]));
  }, [currentMode]);

  return (
    <div className="App">
      <SelectMode onModeChange={handleChangeMode} availableMods={availableMods} />
      {currentMode
        ? (
          <MemoizedSquare field={currentMode.field} onMove={handleAddMoveToLog} />
        ) : (
          <h3 style={{ gridColumn: '1 / 2' }}>Choose a game mode to begin!</h3>
        )}
      {moveHistory.length !== 0 && <MoveLog moves={moveHistory} />}
    </div>
  );
}

export default App;
