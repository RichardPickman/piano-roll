import { m } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import { usePointers } from '../../hooks/usePointers';
import { Cut } from '../../types/doubleRange';
import { cn, getRandomRGB } from '../../utils';
import { DrawingBox } from './elements/DrawingBox';
import { SingleCut } from './elements/SingleCut';

interface Props {
    cuts: Cut[];
    onCutsChange: (cuts: Cut[]) => void;
}

export const DoubleRange = ({ cuts, onCutsChange }: Props) => {
    const [isDrawing, setDrawing] = useState(false);
    const { background, border, setColor, removeColor } = useColors();
    const {
        firstPointer,
        secondPointer,
        moveFirstPointer,
        moveSecondPointer,
        stopPointers,
    } = usePointers();

    const left = Math.min(firstPointer, secondPointer);
    const right = Math.max(firstPointer, secondPointer);

    // Nullify all drawing states;
    const stopDrawing = () => {
        setDrawing(false);
        removeColor();
        stopPointers();
    };

    // On the first click we define a starting pointer
    const onMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        setDrawing(true);

        // On the first click we setting the same positions, because otherwise cut will be displayed from pixel zero to pointer
        moveFirstPointer(event);
        moveSecondPointer(event);

        // On the first click we setting a random color for new cut
        setColor(getRandomRGB());
    };

    const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        // if not drawing then just return
        if (!isDrawing) {
            return;
        }

        moveSecondPointer(event);
    };

    const onMouseUp = () => {
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

    const removeCut = (event: MouseEvent<HTMLDivElement>) => {
        // This function get invoked, when we clicking remove button on cut
        event.stopPropagation();

        // As unique value I used a background string, since I don't have any other unique values
        const background = event.currentTarget.getAttribute('data-unique-id');
        const result = cuts.filter(item => item.background !== background);

        onCutsChange(result);
    };

    return (
        <m.div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
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
                    onRemove={removeCut}
                />
            ))}
        </m.div>
    );
};
