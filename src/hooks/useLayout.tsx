import { useSpring } from 'framer-motion';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { GRID_COLUMNS, LAYOUT_COLUMNS, LAYOUT_GAP } from '../constants';

const config = {
    stiffness: 200,
    damping: 15,
    mass: 0.2,
};

export const useLayout = (
    container: MutableRefObject<HTMLDivElement | null>,
    isMain: boolean,
    onRemove: () => void,
) => {
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
    const containerWidth = containerRect ? containerRect?.width : 0;

    const mainWidth = useSpring(0, config);
    const secondaryWidth = useSpring(0, config);
    const cardWidth = useSpring(0, config);

    const setListLayout = useCallback(() => {
        mainWidth.set(0);
        secondaryWidth.set(containerWidth);
        cardWidth.set(containerWidth / LAYOUT_COLUMNS - LAYOUT_GAP * 2);

        onRemove();
    }, [cardWidth, containerWidth, mainWidth, onRemove, secondaryWidth]);

    const setMainLayout = useCallback(() => {
        const onePart = containerWidth / GRID_COLUMNS || 0;

        mainWidth.set(onePart * LAYOUT_COLUMNS);
        secondaryWidth.set(onePart - LAYOUT_GAP);
    }, [containerWidth, mainWidth, secondaryWidth]);

    const updateContainer = useCallback(() => {
        if (container.current) {
            const dimensions = container.current.getBoundingClientRect();

            setContainerRect(dimensions);

            isMain ? setMainLayout() : setListLayout();
        }
    }, [container, isMain, setListLayout, setMainLayout]);

    useEffect(() => {
        updateContainer();
    }, [container, updateContainer]);

    useEffect(() => {
        window.addEventListener('resize', updateContainer);

        return () => {
            window.removeEventListener('resize', updateContainer);
        };
    }, [updateContainer]);

    return {
        mainWidth,
        secondaryWidth,
        cardWidth,
        containerRect,
        containerWidth,
        setListLayout,
        setMainLayout,
    };
};
