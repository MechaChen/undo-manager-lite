import useUndoRedo from './hooks/useUndoRedo';

import './App.css'

function App() {
  const [value, inputRef, { push, undo, redo }] = useUndoRedo<string>('', 25);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => push(e.target.value)}
      />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  )
}

export default App
