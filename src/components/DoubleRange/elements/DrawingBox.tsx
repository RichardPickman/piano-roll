import { m } from 'framer-motion';

interface Props {
    isActive: boolean;
    left: number;
    right: number;
    background: string;
    border: string;
}
export const DrawingBox = (props: Props) => {
    const { isActive, left, right, background, border } = props;
    const width = right - left;

    if (isActive) {
        return (
            <m.div
                className="absolute h-full"
                style={{
                    left,
                    right,
                    width,
                    backgroundColor: background,
                    borderLeft: border,
                    borderRight: border,
                }}
            />
        );
    }

    return null;
};
