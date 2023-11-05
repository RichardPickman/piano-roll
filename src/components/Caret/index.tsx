import { m } from 'framer-motion';

export const Caret = ({ caret }: { caret: number | null }) => {
    return caret ? (
        <m.div
            className="absolute h-full w-[1px]"
            style={{
                left: caret ? caret : undefined,
            }}
        />
    ) : null;
};
