import { NoteAttributes } from '../../types';

interface Props {
    attributes: NoteAttributes;
}

/**
 * NoteItem is component that renders note svg.
 *
 * @param attributes NoteAttribute argument for primary content
 */

export const NoteItem = ({ attributes }: Props) => (
    <div className="relative aspect-video w-full items-center justify-center rounded border bg-slate-600">
        <svg
            className="relative h-full w-full bg-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2 1"
        >
            {attributes.rectangulars.map(item => (
                <rect key={item.x + item.y + item.width} {...item} />
            ))}
            {attributes.blanks.map(item => (
                <rect key={item.x + item.y + item.width} {...item} />
            ))}
            {attributes.lines.map(item => (
                <line key={item.x1 + item.x2 + item.y1} {...item} />
            ))}
        </svg>
    </div>
);
