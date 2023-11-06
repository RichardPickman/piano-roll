import { MotionValue, m } from 'framer-motion';
import { ReactNode } from 'react';
import { LAYOUT_GAP } from '../../constants';

interface Props {
    width: MotionValue<number>;
    children: ReactNode;
}

/**
 * Secondary column, that might be as width as parent in case when there is no notes selected, or will be 1/4 width in case note is selected
 *
 * @param width number of width in pixels
 *
 */

export const Secondary = ({ width, children }: Props) => {
    return (
        <m.div
            className="relative flex flex-wrap justify-center overflow-auto"
            style={{ width, gap: LAYOUT_GAP }}
        >
            {children}
        </m.div>
    );
};
