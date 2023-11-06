import { AnimatePresence, m } from 'framer-motion';
import { NoteItem } from '../Note';
import { NoteAttributes } from '../../types';

interface Props {
    floatData: {
        shouldAppear: boolean;
        rect: { top: number; left: number; width: number };
        containerRect: DOMRect | null;
        attributes: NoteAttributes | null;
    };
}

/**
 * FloatCard is component, that drew floating card with animation, to give the user a illusion of moving card that he chose
 *
 * @param shouldAppear boolean value to handle drawing process
 * @param rect DOMRect values of card that was clicked to get the starting position.
 * @param containerRect DOMRect values of primary container to calculate the end position.
 * @param attributes NoteAttributes to render notes inside of a floating card
 */

export const FloatCard = ({ floatData }: Props) => {
    const { containerRect, rect, shouldAppear, attributes } = floatData;

    if (!containerRect || !rect || !attributes) {
        return null;
    }

    return (
        <AnimatePresence>
            {shouldAppear && (
                <m.div
                    key="float card"
                    className="absolute z-50 aspect-video"
                    initial={{
                        top: rect.top - window.scrollX,
                        left: rect.left - window.scrollY,
                        width: rect.width,
                    }}
                    animate={{
                        top: containerRect.top,
                        left: containerRect.left,
                        width: (containerRect.width / 4) * 3,
                    }}
                    exit={{ opacity: 0 }}
                >
                    <NoteItem attributes={attributes} />
                </m.div>
            )}
        </AnimatePresence>
    );
};
