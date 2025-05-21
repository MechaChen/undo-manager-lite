# Undo redo hook lite

- [Getting Started](#getting-started)
- [Demo](#demo)
- Undo/Redo Mechanisms
  - [Single Undo Stack and Move by Index](#single-undo-stack-and-move-by-index)
  - [2 Stacks - Undo Stack & Redo Stack](#2-stacks---undo-stack--redo-stack)
- [Comparison](#comparison)
- [Optimization](#optimization)
- [References](#references)

&nbsp;

## Getting Started

1. install `bun`
2. `bun install`
3. `bun dev`
4. start play

&nbsp;

## Demo: 

https://github.com/user-attachments/assets/14d5548e-5ea5-42e0-b016-673fa6729107

&nbsp;


There are 2 ways to implement undo/redo mechanism:
1. single undo stack and move by index ([./src/hooks/useUndoRedoByIndex.ts](https://github.com/MechaChen/undo-manager-lite/blob/main/src/hooks/useUndoRedoByIndex.ts))
2. 2 stacks - undo stack & redo stack ([./src/hooks/useUndoRedoByTwoStack.ts](https://github.com/MechaChen/undo-manager-lite/blob/main/src/hooks/useUndoRedoByTwoStack.ts))

&nbsp;

## Single undo stack and move by index
Use a single stack to store the user's operation history, and
- when user undo, move index backward (-1)
- when user redo, move index forward (+1)

&nbsp;

## 2 Stacks - undo stack & redo stack
Use 2 stacks to store the undo and redo histories
- when user undo
  1. `pop` current state from undo stack
  2. `push` current state to redo stack
  3. get the latest previous state from the last item in the undo stack
  4. set state with the latest previous version
 
- when user redo
  1. `pop` next state from redo stack
  2. `push` redo state to undo stack
  3. set state with next version
 
&nbsp;
 
## Comparison

| Feature | by index | by 2 stacks |
|---------|-------------------|----------------------|
| Implementation | Single array + index | Two stacks (undo/redo) |
| Memory Usage | ✅ Less (single array) | ⚠️ More (two arrays) |
| Code Complexity | ⚠️ Complex (index management) | ✅ Simple (intuitive push/pop) |
| Error Risk | ⚠️ High (index out of bounds) | ✅ Low (no index management) |
| Extensibility | ⚠️ Difficult (complex index logic) | ✅ Easy (simple to add features) |
| Performance | ✅ Better (fewer slice operations) | ⚠️ Worse (maintain two arrays) |
| Readability | ⚠️ Poor (need to understand index logic) | ✅ Good (clear semantics) |
| Maintainability | ⚠️ Poor (prone to bugs) | ✅ Good (clear logic) |
| Used by | - Google Docs (early version)<br>- Microsoft Word (early version)<br>- Adobe Photoshop (early version) | - [Lexical](https://github.com/facebook/lexical/blob/main/packages/lexical-history/src/index.ts)<br> - [NSUndo manager](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/UndoArchitecture/Articles/RegisteringUndo.html#//apple_ref/doc/uid/20000206-SW2) (iOS, macOS standard) - VS Code<br>- Sublime Text<br>- Atom<br>- Google Docs (current version)<br>- Microsoft Word (current version)<br>- Adobe Photoshop (current version)<br>- Figma |

&nbsp;

## Optimization
To prevent memory leak, we can setup undo stack size limit, and when new operation come in, 
which makes the stack exceed the limit, slice the stack by size of (current stack size - limit)


&nbsp;

## References
- [UI Algorithms: A Tiny Undo Stack](https://blog.julik.nl/2025/03/a-tiny-undo-stack)
- [Build an Undo-Redo Hook in React with Keyboard Shortcut Support: Step-by-Step Tutorial](https://www.youtube.com/watch?v=pR1r-1KGtNU)
