import { AnimatePresence, m } from 'framer-motion';
import { MouseEvent, useRef, useState } from 'react';
import { DoubleRange } from '../components/DoubleRange';
import { FloatCard } from '../components/FloatCard';
import { NoteItem } from '../components/Note';
import { DELAY, LAYOUT_GAP } from '../constants';
import { useCaretValue } from '../hooks/useCaretValue';
import { useFloatValues } from '../hooks/useFloatValues';
import { useLayout } from '../hooks/useLayout';
import { NoteAttributes } from '../types';
import { Cut } from '../types/doubleRange';
import { cn } from '../utils';
import { Secondary } from './elements/Secondary';
import { Primary } from './elements/Primary';
import { Caret } from '../components/Caret';
import { Card } from '../components/Card';

interface Props {
    currentNote: NoteAttributes | null;
    notes: NoteAttributes[] | null;
    onClick: (note: NoteAttributes) => void;
    onRemove: () => void;
}

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

const MainControls = ({ onRemove, onClear }: ControlsProps) => (
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

interface MainContainerProps {
    currentNote: NoteAttributes;
    onRemove: () => void;
}

const MainContainer = ({ currentNote, onRemove }: MainContainerProps) => {
    const { caret, moveCaret } = useCaretValue();
    const [cuts, setCuts] = useState<Cut[]>([]);

    return (
        <AnimatePresence>
            <m.div
                key="notes"
                className="relative aspect-video w-full items-center justify-center rounded border"
                {...variants}
            >
                <NoteItem attributes={currentNote} />
                <div
                    onClick={moveCaret}
                    className="absolute h-full w-full bg-transparent"
                >
                    <DoubleRange
                        cuts={cuts}
                        onCutsChange={cuts => setCuts(cuts)}
                    />
                    <Caret caret={caret} />
                </div>
            </m.div>
            <MainControls onRemove={onRemove} onClear={() => setCuts([])} />
        </AnimatePresence>
    );
};

export const Layout = ({ currentNote, notes, onClick, onRemove }: Props) => {
    const container = useRef<HTMLDivElement | null>(null);
    const { isActive, rect, renderFloatCard } = useFloatValues();

    const { mainWidth, secondaryWidth, cardWidth, containerRect } = useLayout(
        container,
        !!currentNote,
        onRemove,
    );

    const handleCardClick = (
        event: MouseEvent<HTMLDivElement>,
        item: NoteAttributes,
    ) => {
        renderFloatCard(event.currentTarget.getBoundingClientRect());
        onClick(item);
    };

    const floatData = {
        shouldAppear: isActive,
        rect,
        containerRect,
        attributes: currentNote,
    };

    return (
        <main
            className={cn(
                'relative flex h-screen justify-center px-6 py-4 text-white',
                isActive && 'cursor-wait',
            )}
        >
            <FloatCard floatData={floatData} />
            <div
                ref={container}
                className={cn(
                    'relative flex h-full w-full max-w-7xl',
                    isActive && 'pointer-events-none',
                )}
                style={{ gap: LAYOUT_GAP }}
            >
                <Primary key={currentNote?.id} width={mainWidth}>
                    {currentNote && (
                        <MainContainer
                            currentNote={currentNote}
                            onRemove={onRemove}
                        />
                    )}
                </Primary>
                <Secondary width={secondaryWidth}>
                    {notes &&
                        notes.map((item, index) => (
                            <Card
                                key={item.id}
                                className="cursor-pointer bg-slate-600"
                                data-item={item}
                                onClick={event => handleCardClick(event, item)}
                                style={{ width: cardWidth }}
                            >
                                <NoteItem attributes={notes[index]} />
                            </Card>
                        ))}
                </Secondary>
            </div>
        </main>
    );
};
