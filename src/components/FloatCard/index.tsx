import { AnimatePresence, m } from 'framer-motion';
import { NoteItem } from '../Note';
import { NoteAttributes } from '../../types';

interface Props {
    shouldAppear: boolean;
    rect: { top: number; left: number; width: number } | null;
    containerRect: DOMRect | null;
    attributes: NoteAttributes | null;
}

export const FloatCard = ({
    shouldAppear,
    rect,
    containerRect,
    attributes,
}: Props) => {
    if (containerRect && rect) {
        return (
            shouldAppear &&
            attributes && (
                <AnimatePresence>
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
                </AnimatePresence>
            )
        );
    }

    return null;
};
