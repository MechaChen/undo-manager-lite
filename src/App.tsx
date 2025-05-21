import useUndoRedoByIndex from './hooks/useUndoRedoByIndex';

import './App.css'
import useUndoRedoByTwoStack from './hooks/useUndoRedoByTwoStack';

function InputWithIndexedUndoRedo() {
  const [value, inputRef, { push, undo, redo }] = useUndoRedoByIndex<string>('', 25);

  return (
    <>
      <label
        htmlFor="indexed-undo-redo"
        style={{ marginRight: '10px' }}
      >
        Undo/Redo By Index
      </label>
      <input
        id="indexed-undo-redo"
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => push(e.target.value)}
      />
    </>
  )
}

function InputWithTwoStackUndoRedo() {
  const [value, inputRef, { push }] = useUndoRedoByTwoStack<string>('', 25);

  return (
    <>
      <label
        htmlFor="two-stack-undo-redo"
        style={{ marginRight: '10px' }}
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
      />
    </>
  )
}

function App() {
  return (
    <div>
      {/* <InputWithIndexedUndoRedo /> */}
      <InputWithTwoStackUndoRedo />
    </div>
  )
}

export default App
