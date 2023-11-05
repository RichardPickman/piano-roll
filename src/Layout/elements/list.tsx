import { MotionValue, m } from 'framer-motion';
import { ReactNode } from 'react';
import { LAYOUT_GAP } from '../../constants';

interface Props {
    containerWidth: MotionValue<number>;
    children: ReactNode;
}

export const Secondary = ({ containerWidth, children }: Props) => {
    return (
        <m.div
            className="relative flex h-full flex-wrap justify-center overflow-auto"
            style={{ width: containerWidth, gap: LAYOUT_GAP }}
        >
            {children}
        </m.div>
    );
};
