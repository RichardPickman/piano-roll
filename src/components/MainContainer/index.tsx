import { useState } from 'react';
import { useCaretValue } from '../../hooks/useCaretValue';
import { NoteAttributes } from '../../types';
import { Cut } from '../../types/doubleRange';
import { Controls } from './elements/Controls';
import { SelectedNote } from './elements/SelectedNote';

interface Props {
    currentNote: NoteAttributes;
    onRemove: () => void;
}

/**
 * Main column is the container where current note is being rendered
 *
 * @param currentNote NoteAttribute argument for primary content
 * @param onRemove callback for removing current note
 */

export const MainContainer = ({ currentNote, onRemove }: Props) => {
    const { caret, moveCaret } = useCaretValue();
    const [cuts, setCuts] = useState<Cut[]>([]);

    return (
        <div className="flex flex-col gap-4">
            <SelectedNote
                cuts={cuts}
                caret={caret}
                currentNote={currentNote}
                moveCaret={moveCaret}
                onCutsChange={value => setCuts(value)}
            />
            <Controls onRemove={onRemove} onClear={() => setCuts([])} />
        </div>
    );
};
