import { MouseEvent, useState } from 'react';
import { getPointerPosition } from '../utils';

/**
 * Hook that working with caret position and exposes function to change the value using event values
 *
 * @returns caret position and moveCaret callback function
 */

export const useCaretValue = () => {
    const [caret, setCaret] = useState<number | null>(null);

    const moveCaret = (event: MouseEvent<HTMLDivElement>) => {
        const pointer = getPointerPosition(event);

        setCaret(pointer);
    };

    return { caret, moveCaret };
};
