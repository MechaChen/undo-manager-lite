import useUndoRedoByIndex from './hooks/useUndoRedoByIndex';
import undoIcon from './assets/undo.svg';
import redoIcon from './assets/redo.svg';

import './App.css'
import useUndoRedoByTwoStack from './hooks/useUndoRedoByTwoStack';

function InputWithIndexedUndoRedo() {
  const [value, inputRef, { push, undo, redo }] = useUndoRedoByIndex<string>('', 25);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
      <label
        htmlFor="indexed-undo-redo"
        style={{ marginRight: '10px', width: '200px' }}
      >
        Undo/Redo By Index
      </label>
      <input
        id="indexed-undo-redo"
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => push(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={undo} style={{ marginRight: '10px' }}>
        <img src={undoIcon} alt="undo" />
      </button>
      <button onClick={redo}>
        <img src={redoIcon} alt="redo" />
      </button>
    </div>
  )
}

function InputWithTwoStackUndoRedo() {
  const [value, inputRef, { push, undo, redo }] = useUndoRedoByTwoStack<string>('', 25);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label
        htmlFor="two-stack-undo-redo"
        style={{ marginRight: '10px', width: '200px' }}
      >
        Undo/Redo By Two Stack
      </label>
      <input
        autoComplete="off"
        id="two-stack-undo-redo"
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => push(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={undo} style={{ marginRight: '10px' }}>
        <img src={undoIcon} alt="undo" />
      </button>
      <button onClick={redo}>
        <img src={redoIcon} alt="redo" />
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <InputWithIndexedUndoRedo />
      <InputWithTwoStackUndoRedo />
    </div>
  )
}

export default App
