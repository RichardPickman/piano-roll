import { useState } from 'react';

/**
 * Hook handles rgb colors using state.
 *
 * @returns background and border colors in rgba() format, also exposes callbacks to change the color
 */

export const useColors = () => {
    const [rgb, setRgb] = useState({
        red: 0,
        green: 0,
        blue: 0,
    });
    const background = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.4)`;
    const border = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.6)`;

    const setColor = (color: typeof rgb) => setRgb(color);
    const removeColor = () =>
        setRgb({
            red: 0,
            green: 0,
            blue: 0,
        });

    return {
        background,
        border,
        setColor,
        removeColor,
    };
};
