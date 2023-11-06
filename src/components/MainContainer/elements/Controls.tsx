import { MouseEvent } from 'react';
import { variants } from '../variants';
import { AnimatePresence, m } from 'framer-motion';

interface ControlsProps {
    onRemove: (event: MouseEvent<HTMLDivElement>) => void;
    onClear: () => void;
}

/**
 * Controls component contains 2 buttons. First one is for removing current note, second one is for clearing the pallete of double ranges.
 *
 * @param onRemove callback to remove current note
 * @param onClear callback to clear all ranges
 */

export const Controls = ({ onRemove, onClear }: ControlsProps) => (
    <AnimatePresence>
        <m.div key="controls-box" {...variants} className="flex gap-4">
            <div
                className="w-fit cursor-pointer rounded border bg-slate-600 px-4 py-2"
                onClick={onRemove}
            >
                Close
            </div>
            <div
                className="w-fit cursor-pointer rounded border bg-slate-600 px-4 py-2"
                onClick={onClear}
            >
                Clear pallette!
            </div>
        </m.div>
    </AnimatePresence>
);
