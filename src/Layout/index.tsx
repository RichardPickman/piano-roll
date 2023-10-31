import { AnimatePresence, m, useSpring } from 'framer-motion';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../components/Card';
import { Vegetable } from '../types';

interface Props {
    currentNote: Vegetable | null;
    notes: Vegetable[];
    onClick: (note: Vegetable) => void;
    onRemove: () => void;
}

const LAYOUT_GAP = 16;
const LAYOUT_COLUMNS = 3;

const GRID_COLUMNS = 4;

const config = {
    stiffness: 200,
    damping: 15,
    mass: 0.1,
};

const cardData = {
    shouldAppear: false,
    rect: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
    },
};

export const Layout = ({ currentNote, notes, onClick, onRemove }: Props) => {
    const [dimensions, setDimensions] = useState<DOMRect | null>(null);
    const [card, setCard] = useState(cardData);
    const container = useRef<HTMLDivElement | null>(null);

    const PRIMARY_WIDTH = useSpring(0, config);
    const SECONDARY_WIDTH = useSpring(0, config);
    const NOTE_WIDTH = useSpring(0, config);

    const calculate = useCallback(() => {
        if (dimensions) {
            const onePart = dimensions.width / GRID_COLUMNS;
            const primaryWidth = onePart * LAYOUT_COLUMNS;
            const noteWidth = dimensions.width / LAYOUT_COLUMNS - LAYOUT_GAP;

            PRIMARY_WIDTH.set(currentNote ? primaryWidth : 0);
            SECONDARY_WIDTH.set(currentNote ? onePart : dimensions.width);
            NOTE_WIDTH.set(currentNote ? onePart : noteWidth);
        }
    }, [NOTE_WIDTH, PRIMARY_WIDTH, SECONDARY_WIDTH, currentNote, dimensions]);

    const handleCardClick = (
        event: MouseEvent<HTMLDivElement>,
        item: Vegetable,
    ) => {
        onClick(item);

        const rect = event.currentTarget.getBoundingClientRect();

        setCard({
            shouldAppear: true,
            rect,
        });

        setTimeout(() => setCard(cardData), 1000);
    };

    useEffect(() => {
        if (container.current) {
            const dims = container.current.getBoundingClientRect();

            setDimensions(dims);
        }
    }, [container]);

    useEffect(() => {
        window.addEventListener('resize', calculate);

        return () => {
            window.removeEventListener('resize', calculate);
        };
    }, [calculate]);

    useEffect(() => {
        calculate();
    }, [container, calculate]);

    return (
        <main className="relative flex h-screen justify-center px-6 py-4 text-white">
            {card.shouldAppear && currentNote && dimensions && (
                <m.div
                    className="absolute"
                    initial={card.rect}
                    animate={dimensions}
                >
                    <Card>{currentNote.text}</Card>
                </m.div>
            )}
            <button className="absolute left-0 top-0" onClick={onRemove}>
                remove
            </button>
            <div
                ref={container}
                className="relative flex h-full w-full max-w-7xl"
                style={{ gap: LAYOUT_GAP }}
            >
                <m.div
                    className="empty:hidden"
                    style={{ width: PRIMARY_WIDTH }}
                >
                    <AnimatePresence>
                        {currentNote && (
                            <m.div
                                initial={{ display: 'none' }}
                                animate={{
                                    display: 'flex',
                                    transition: {
                                        delay: 1,
                                    },
                                }}
                                exit={{
                                    left: 0,
                                }}
                                className="flex aspect-video w-full items-center justify-center rounded border bg-slate-600"
                            >
                                {currentNote.text}
                            </m.div>
                        )}
                    </AnimatePresence>
                </m.div>
                <m.div
                    className="relative flex h-full flex-wrap justify-center overflow-auto"
                    style={{ width: SECONDARY_WIDTH, gap: LAYOUT_GAP }}
                >
                    {notes.map(item => (
                        <m.div
                            className="aspect-video"
                            onClick={event => handleCardClick(event, item)}
                            style={{ width: NOTE_WIDTH }}
                        >
                            <Card>{item.text}</Card>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </main>
    );
};
