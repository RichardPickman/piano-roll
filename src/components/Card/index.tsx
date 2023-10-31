import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const Card = ({ children }: Props) => {
    return (
        <div className="flex h-full w-full items-center justify-center rounded border bg-slate-600">
            {children}
        </div>
    );
};
