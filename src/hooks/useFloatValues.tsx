import { useState } from 'react';
import { DELAY } from '../constants';

const initialCard = {
    top: 0,
    left: 0,
    width: 0,
};

export const useFloatValues = () => {
    const [isActive, setActive] = useState(false);
    const [rect, setRect] = useState(initialCard);

    const startMoving = (rect: DOMRect) => {
        setActive(true);
        setRect(rect);
    };

    const stopMoving = () => {
        setActive(false);
        setRect(initialCard);
    };

    const renderFloatCard = (rect: DOMRect) => {
        startMoving(rect);

        setTimeout(() => stopMoving(), 1000 * DELAY);
    };

    return {
        isActive,
        rect,
        renderFloatCard,
    };
};
