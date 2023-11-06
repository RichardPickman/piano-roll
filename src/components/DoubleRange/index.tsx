import { m } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { useColors } from '../../hooks/useColors';
import { usePointers } from '../../hooks/usePointers';
import { NoteAttributes } from '../../types';
import { Cut } from '../../types/doubleRange';
import { cn, getRandomRGB } from '../../utils';
import { DrawingBox } from './elements/DrawingBox';
import { SingleCut } from './elements/SingleCut';
import { getNotesAmount } from '../../services/notes';

interface Props {
    currentNote: NoteAttributes;
    cuts: Cut[];
    onCutsChange: (cuts: Cut[]) => void;
}

/**
 * Double range is component for selecting range. That component gets flexbox values of its parent and creates an absolute position box to be able to get selection range.
 *
 * @param cuts Array of range cuts
 * @param onCutsChange callback to change range array
 *
 */

export const DoubleRange = ({ cuts, currentNote, onCutsChange }: Props) => {
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

    const onMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        // If width is equals 0, then single click occured
        if (left - right === 0) {
            stopDrawing();

            return;
        }

        // Stop drawing process
        stopDrawing();

        const rect = event.currentTarget.getBoundingClientRect();

        // Push new cut to cuts array
        onCutsChange([
            ...cuts,
            {
                start: left,
                end: right,
                background,
                border,
                notesAmount: getNotesAmount(currentNote, rect, left, right),
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
                'absolute h-full w-full cursor-pointer bg-transparent',
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
