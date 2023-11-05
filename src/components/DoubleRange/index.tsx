import { m } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import { Cut } from '../../types/doubleRange';
import { cn, getRandomRGB } from '../../utils';
import { DrawingBox } from './elements/DrawingBox';
import { SingleCut } from './elements/SingleCut';

interface Props {
    cuts: Cut[];
    onCutsChange: (cuts: Cut[]) => void;
}

const getPointerPosition = (event: MouseEvent<HTMLDivElement>) =>
    event.clientX - event.currentTarget.getBoundingClientRect().left;

export const DoubleRange = ({ cuts, onCutsChange }: Props) => {
    const [isDrawing, setDrawing] = useState(false);
    const { background, border, setColor } = useColors();

    const [firstPointer, setFirstPointer] = useState(0);
    const [secondPointer, setSecondPointer] = useState(0);

    const left = Math.min(firstPointer, secondPointer);
    const right = Math.max(firstPointer, secondPointer);

    const stopDrawing = () => {
        // Nullify all drawing states;
        setDrawing(false);

        setFirstPointer(0);
        setSecondPointer(0);
        setColor({
            red: 0,
            green: 0,
            blue: 0,
        });
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setDrawing(true);

        const pointer = getPointerPosition(event);

        // On the first click we setting the same positions, because otherwise cut will be displayed from pixel zero to pointer
        setFirstPointer(pointer);
        setSecondPointer(pointer);

        // On the first click we setting a random color for new cut
        setColor(getRandomRGB());
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        // if not drawing then just return
        if (!isDrawing) {
            return;
        }

        // Otherwise its drawing process, then we need to listen to every mouse event
        const pointer = getPointerPosition(event);

        setSecondPointer(pointer);
    };

    const handleMouseUp = () => {
        // If width is equals 0, then single click occured
        if (left - right === 0) {
            stopDrawing();

            return;
        }

        // Stop drawing process
        stopDrawing();

        // Push new cut to cuts array
        onCutsChange([
            ...cuts,
            {
                start: left,
                end: right,
                background,
                border,
            },
        ]);
    };

    const handleCutRemove = (event: MouseEvent<HTMLDivElement>) => {
        // This function get invoked, when we clicking remove button on cut
        event.stopPropagation();

        // As unique value I used a background string, since I don't have any other unique values
        const background = event.currentTarget.getAttribute('data-unique-id');
        const result = cuts.filter(item => item.background !== background);

        onCutsChange(result);
    };

    return (
        <m.div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className={cn(
                'absolute h-full w-full bg-transparent',
                isDrawing && 'cursor-grabbing',
            )}
        >
            <DrawingBox
                isActive={isDrawing}
                left={left}
                right={right}
                background={background}
                border={border}
            />
            {cuts.map(item => (
                <SingleCut
                    key={item.start + item.end}
                    cut={item}
                    onRemove={handleCutRemove}
                />
            ))}
        </m.div>
    );
};
