import { useState } from 'react';

export const useColors = () => {
    const [rgb, setRgb] = useState({
        red: 0,
        green: 0,
        blue: 0,
    });
    const background = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.2)`;
    const border = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.4)`;

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
