import { useState, useRef, useEffect } from "react";

const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);
const isWindows = /Win32|Win64|Windows|WinCE/.test(navigator.userAgent);

const useUndoRedoByTwoStack = <T>(initialValue: T, limit: number = 10) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const undoStack = useRef<T[]>([initialValue]);
    const redoStack = useRef<T[]>([]);

    const push = (value: T) => {
        undoStack.current.push(value);
        if (undoStack.current.length > limit) {
            undoStack.current.shift();
        }

        redoStack.current = [];
        setValue(value);
    }

    const undo = () => {
        if (undoStack.current.length <= 1) {
            return;
        }

        const currentValue = undoStack.current.pop();
        const prevValue = undoStack.current[undoStack.current.length - 1];
        redoStack.current.push(currentValue!);
        setValue(prevValue);
    }
    
    const redo = () => {
        if (redoStack.current.length === 0) {
            return;
        }

        const nextStep = redoStack.current.pop();
        undoStack.current.push(value);
        setValue(nextStep!);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const hasInput = inputRef.current;
            const isInputFocused = inputRef.current === document.activeElement;

            if (!hasInput || !isInputFocused) {
                return;
            }

            const isMacUndoShortcut = event.key === 'z' && event.metaKey;
            const isMacRedoShortcut = event.key === 'y' && event.metaKey;
            const isWindowsUndoShortcut = event.key === 'z' && event.ctrlKey;
            const isWindowsRedoShortcut = event.key === 'y' && event.ctrlKey;

            const isMacUndo = isMac && isMacUndoShortcut;
            const isWindowsUndo = isWindows && isWindowsUndoShortcut;
            const isUndo = isMacUndo || isWindowsUndo;

            const isMacRedo = isMac && isMacRedoShortcut;
            const isWindowsRedo = isWindows && isWindowsRedoShortcut;
            const isRedo = isMacRedo || isWindowsRedo;

            if (isUndo) {
                event.preventDefault();
                undo();
            } else if (isRedo) {
                event.preventDefault();
                redo();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undoStack.current, redoStack.current]);

    const clear = () => {
        undoStack.current = [];
        redoStack.current = [];
    }

    const canUndo = undoStack.current.length > 0;
    const canRedo = redoStack.current.length > 0;

    return [value, inputRef, { push, undo, redo, clear }, { canUndo, canRedo }] as const;
}

export default useUndoRedoByTwoStack;
