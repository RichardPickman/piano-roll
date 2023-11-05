import { MouseEvent, ReactNode } from 'react';
import { MotionStyle, m } from 'framer-motion';
import { cn } from '../../utils';

type Props = {
    className: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    style?: MotionStyle;
};

export const Card = ({ children, className, onClick, style }: Props) => {
    return (
        <m.div
            className={cn(
                'aspect-video w-full rounded border bg-slate-600',
                className,
            )}
            onClick={onClick}
            style={style}
        >
            {children}
        </m.div>
    );
};
