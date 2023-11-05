import { AnimatePresence, m } from 'framer-motion';
import { MouseEvent, useRef, useState } from 'react';
import { Card } from '../components/Card';
import { DoubleRange } from '../components/DoubleRange';
import { FloatCard } from '../components/FloatCard';
import { NoteItem } from '../components/Note';
import { DELAY, LAYOUT_GAP } from '../constants';
import { useLayout } from '../hooks/useLayout';
import { NoteAttributes } from '../types';
import { Cut } from '../types/doubleRange';
import { cn, getPointerPosition } from '../utils';
import { Secondary } from './elements/list';
import { Primary } from './elements/main';

interface Props {
    currentNote: NoteAttributes | null;
    notes: NoteAttributes[] | null;
    onClick: (note: NoteAttributes) => void;
    onRemove: () => void;
}

interface Card {
    shouldAppear: boolean;
    rect: {
        top: number;
        left: number;
        width: number;
    };
}

const initialCard: Card = {
    shouldAppear: false,
    rect: {
        top: 0,
        left: 0,
        width: 0,
    },
};

const variants = {
    initial: { display: 'none' },
    animate: {
        display: 'flex',
        transition: { delay: DELAY },
    },
    exit: {
        opacity: 0,
    },
};

interface ControlsProps {
    onRemove: (event: MouseEvent<HTMLDivElement>) => void;
    onClear: () => void;
}

const MainControls = ({ onRemove, onClear }: ControlsProps) => {
    return (
        <m.div {...variants} className="flex gap-4">
            <div
                className="w-fit cursor-pointer rounded border bg-slate-600 px-4 py-2"
                onClick={onRemove}
            >
                Close
            </div>
            <div
                className="w-fit cursor-pointer rounded border bg-slate-600 px-4 py-2"
                onClick={onClear}
            >
                Clear pallette!
            </div>
        </m.div>
    );
};

export const Layout = ({ currentNote, notes, onClick, onRemove }: Props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const [card, setCard] = useState(initialCard);
    const { mainWidth, secondaryWidth, cardWidth, containerRect } = useLayout(
        container,
        !!currentNote,
        onRemove,
    );

    const renderFloatCard = (rect: DOMRect) => {
        setCard({
            shouldAppear: true,
            rect,
        });

        setTimeout(() => setCard(initialCard), 1000 * DELAY);
    };

    const handleCardClick = (
        event: MouseEvent<HTMLDivElement>,
        item: NoteAttributes,
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();

        renderFloatCard(rect);
        onClick(item);
    };

    const [cuts, setCuts] = useState<Cut[]>([]);
    const [caret, setCaret] = useState<number | null>(null);

    const handleCaretClick = (event: MouseEvent<HTMLDivElement>) => {
        const pointer = getPointerPosition(event);

        setCaret(pointer);
    };

    return (
        <main
            className={cn(
                'relative flex h-screen justify-center px-6 py-4 text-white',
                card.shouldAppear && 'cursor-wait',
            )}
        >
            <FloatCard
                shouldAppear={card.shouldAppear}
                rect={card.rect}
                containerRect={containerRect}
                attributes={currentNote}
            />
            <div
                ref={container}
                className={cn(
                    'relative flex h-full w-full max-w-7xl',
                    card.shouldAppear && 'pointer-events-none',
                )}
                style={{ gap: LAYOUT_GAP }}
            >
                <Primary key={currentNote?.id} width={mainWidth}>
                    {currentNote && (
                        <AnimatePresence>
                            <m.div
                                key="notes"
                                className="relative aspect-video items-center justify-center rounded border"
                                style={{ width: mainWidth }}
                                {...variants}
                            >
                                {currentNote && (
                                    <NoteItem attributes={currentNote} />
                                )}
                                <div
                                    onClick={handleCaretClick}
                                    className="absolute h-full w-full bg-transparent"
                                >
                                    <DoubleRange
                                        cuts={cuts}
                                        onCutsChange={cuts => setCuts(cuts)}
                                    />
                                    <m.div
                                        className="absolute h-full w-[1px]"
                                        style={{
                                            left: caret ? caret : undefined,
                                        }}
                                    />
                                </div>
                            </m.div>
                            <MainControls
                                onRemove={onRemove}
                                onClear={() => setCuts([])}
                            />
                        </AnimatePresence>
                    )}
                </Primary>
                <Secondary containerWidth={secondaryWidth}>
                    {notes &&
                        notes.map((item, index) => (
                            <m.div
                                key={item.id}
                                className="aspect-video cursor-pointer bg-slate-600"
                                onClick={event => handleCardClick(event, item)}
                                style={{ width: cardWidth }}
                            >
                                {notes && (
                                    <NoteItem attributes={notes[index]} />
                                )}
                            </m.div>
                        ))}
                </Secondary>
            </div>
        </main>
    );
};
