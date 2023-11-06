import { MotionValue, m } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
    width: MotionValue<number>;
    children: ReactNode;
}

/**
 * Primary box with calculated width of 3/4 or zero, if there is no notes selected.
 *
 * @param width number of width in pixels
 *
 */

export const Primary = ({ width, children }: Props) => {
    return (
        <m.div
            className="relative flex h-full select-none flex-col gap-4"
            style={{ width }}
        >
            {children}
        </m.div>
    );
};
