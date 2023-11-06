import { MotionProps, m } from 'framer-motion';
import { MouseEvent, ReactNode } from 'react';
import { cn } from '../../utils';

type Props = {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
} & MotionProps;

export const Card = ({ children, className, onClick, ...props }: Props) => {
    return (
        <m.div
            className={cn(
                'aspect-video w-full rounded border bg-slate-600',
                className,
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </m.div>
    );
};
