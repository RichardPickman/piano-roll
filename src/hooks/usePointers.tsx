import { MouseEvent, useState } from 'react';
import { getPointerPosition } from '../utils';

export const usePointers = () => {
    const [firstPointer, setFirstPointer] = useState(0);
    const [secondPointer, setSecondPointer] = useState(0);

    const moveFirstPointer = (event: MouseEvent<HTMLDivElement>) => {
        const pointer = getPointerPosition(event);

        // On the first click we setting the same positions, because otherwise cut will be displayed from pixel zero to pointer
        setFirstPointer(pointer);
        setSecondPointer(pointer);
    };

    const moveSecondPointer = (event: MouseEvent<HTMLDivElement>) => {
        // Otherwise its drawing process, then we need to listen to every mouse event
        const pointer = getPointerPosition(event);

        setSecondPointer(pointer);
    };

    const stopPointers = () => {
        setFirstPointer(0);
        setSecondPointer(0);
    };

    return {
        firstPointer,
        secondPointer,
        moveFirstPointer,
        moveSecondPointer,
        stopPointers,
    };
};