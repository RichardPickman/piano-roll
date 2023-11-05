import { MouseEvent, useState } from 'react';
import { getPointerPosition } from '../utils';

export const useCaretValue = () => {
    const [caret, setCaret] = useState<number | null>(null);

    const moveCaret = (event: MouseEvent<HTMLDivElement>) => {
        const pointer = getPointerPosition(event);

        setCaret(pointer);
    };

    return { caret, moveCaret };
};
