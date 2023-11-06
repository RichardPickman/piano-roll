import { MouseEvent, useRef } from 'react';
import { Card } from '../components/Card';
import { FloatCard } from '../components/FloatCard';
import { NoteItem } from '../components/Note';
import { LAYOUT_GAP } from '../constants';
import { useFloatValues } from '../hooks/useFloatValues';
import { useLayout } from '../hooks/useLayout';
import { NoteAttributes } from '../types';
import { cn } from '../utils';
import { Primary } from './elements/Primary';
import { Secondary } from './elements/Secondary';
import { MainContainer } from '../components/MainContainer';

interface Props {
    currentNote: NoteAttributes | null;
    notes: NoteAttributes[] | null;
    onClick: (note: NoteAttributes) => void;
    onRemove: () => void;
}

/**
 * Layout component defined to control width of 2 columns. Primary column contains current note, secondary column is for listing all cards
 *
 * @param currentNote NoteAttribute argument for primary content
 * @param notes NoteAttribute array argument for cards render
 * @param onClick callback for choosing current note
 * @param onRemove callback for removing current note
 */

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
                                className="h-fit cursor-pointer bg-slate-600"
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
