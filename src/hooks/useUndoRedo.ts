import { useState, useEffect } from "react";

const useUndoRedo = <T>(initialValue: T) => {
    const [undoStack, setUndoStack] = useState<T[]>([initialValue]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const LOWER_BOUND = 0;
    const UPPER_BOUND = undoStack.length - 1;

    // 3 steps:
        // 1. push new value
        // 2. undo
        // 3. redo

    const push = (value: T) => {
        const newUndoStack = undoStack.slice(0, currentIndex + 1);
        newUndoStack.push(value);
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
            const isUndoShortcut = event.key === 'z' && event.ctrlKey;
            const isRedoShortcut = event.key === 'y' && event.ctrlKey;

            if (isUndoShortcut) {
                event.preventDefault();
                undo();
            } else if (isRedoShortcut) {
                event.preventDefault();
                redo();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, redo, undo]);

    const curState = undoStack[currentIndex];

    return [curState, { push, undo, redo }];
}

export default useUndoRedo;