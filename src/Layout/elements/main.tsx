import { MotionValue, m } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
    width: MotionValue<number>;
    children: ReactNode;
}

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
