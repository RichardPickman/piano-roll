import { MouseEvent } from 'react';

interface Props {
    cut: {
        start: number;
        end: number;
        background: string;
        border: string;
    };
    onRemove: (event: MouseEvent<HTMLDivElement>) => void;
}

export const SingleCut = ({ cut, onRemove }: Props) => {
    const { start, end, background, border } = cut;

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
