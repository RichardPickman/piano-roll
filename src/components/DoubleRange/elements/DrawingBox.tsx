import { m } from 'framer-motion';

interface Props {
    isActive: boolean;
    left: number;
    right: number;
    background: string;
    border: string;
}

/**
 * Drawing box is component that being rendered in process of selection for UX purposes.
 *
 * @param isActive boolean argument for drawing the box
 * @param left position of first pointer
 * @param right position of second pointer
 * @param background randomized rgba() string for background color of the box
 * @param border randomized rgba() string for border color of the box
 *
 */

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
