import { MouseEvent } from 'react';
import { Cut } from '../../../types/doubleRange';

interface Props {
    cut: Cut;
    onRemove: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Single Cut is a component that being rendered with selected values.
 *
 * @param cut values for single cut, such as { start, end, background, border }
 * @param onRemove callback to remove itself
 *
 */

export const SingleCut = ({ cut, onRemove }: Props) => {
    const { start, end, background, border, notesAmount } = cut;

    return (
        <div
            key={start + end}
            className="absolute z-50 h-full"
            style={{
                width: end - start,
                left: start,
                right: end,
                backgroundColor: background,
                borderLeft: `1px solid ${border}`,
                borderRight: `1px solid ${border}`,
            }}
        >
            <div className="absolute bottom-0 w-full border bg-slate-600 px-2 py-1">
                {notesAmount} notes selected!
            </div>
            <div
                onMouseDown={onRemove}
                data-unique-id={background}
                className="absolute right-0 top-0 z-10 flex cursor-pointer border px-2 py-0.5"
            >
                x
            </div>
        </div>
    );
};
