import { useSpring } from 'framer-motion';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { GRID_COLUMNS, MAIN_WIDTH_COLUMNS, LAYOUT_GAP } from '../constants';

const config = {
    stiffness: 200,
    damping: 15,
    mass: 0.2,
};

/**
 * Hook is handling the width of primary and secondary columns and exposes callbacks to set desired layout: List or Main.
 * @param container ref object of container. Needs to get DOMRect of a container
 * @param isMain boolean value, need to recalculate data and preserve layout
 * @param onRemove callback needed for setting List layout
 */

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
        cardWidth.set(containerWidth / MAIN_WIDTH_COLUMNS - LAYOUT_GAP * 2);

        onRemove();
    }, [cardWidth, containerWidth, mainWidth, onRemove, secondaryWidth]);

    const setMainLayout = useCallback(() => {
        const onePart = containerWidth / GRID_COLUMNS || 0;

        mainWidth.set(onePart * MAIN_WIDTH_COLUMNS);
        secondaryWidth.set(onePart - LAYOUT_GAP);
    }, [containerWidth, mainWidth, secondaryWidth]);

    // Update container rect
    const updateContainer = useCallback(() => {
        if (container.current) {
            const dimensions = container.current.getBoundingClientRect();

            setContainerRect(dimensions);

            isMain ? setMainLayout() : setListLayout();
        }
    }, [container, isMain, setListLayout, setMainLayout]);

    // Update container when container mounts
    useEffect(() => {
        updateContainer();
    }, [container, updateContainer]);

    // Update container on window resize
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
