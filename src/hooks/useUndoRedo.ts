import { useState, useEffect, useRef } from "react";

const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);
const isWindows = /Win32|Win64|Windows|WinCE/.test(navigator.userAgent);

const useUndoRedo = <T>(initialValue: T, limit: number = 10) => {
    const [undoStack, setUndoStack] = useState<T[]>([initialValue]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const LOWER_BOUND = 0;
    const UPPER_BOUND = undoStack.length - 1;

    // 3 steps:
        // 1. push new value
        // 2. undo
        // 3. redo

    const push = (value: T) => {
        let newUndoStack = undoStack.slice(0, currentIndex + 1);
        newUndoStack.push(value);

        if (undoStack.length > limit) {
            newUndoStack = newUndoStack.slice(undoStack.length - limit);
        }

        setUndoStack(newUndoStack);
        setCurrentIndex(newUndoStack.length - 1);
    }

    const undo = () => {
        const prevStep = Math.max(LOWER_BOUND, currentIndex - 1);
        setCurrentIndex(prevStep);
    }

    const redo = () => {
        const nextStep = Math.min(UPPER_BOUND, currentIndex + 1);
        setCurrentIndex(nextStep);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const hasInput = inputRef.current;
            const isInputFocused = inputRef.current === document.activeElement;

            if (!hasInput || !isInputFocused) {
                console.log('no input or not focused');
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
    }, [currentIndex, redo, undo]);

    const curState = undoStack[currentIndex];

    return [curState, inputRef, { push, undo, redo }] as const;
}

export default useUndoRedo;