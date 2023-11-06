import { AnimatePresence } from 'framer-motion';
import { ClickEvent, NoteAttributes } from '../../../types';
import { Cut } from '../../../types/doubleRange';
import { Card } from '../../Card';
import { Caret } from '../../Caret';
import { DoubleRange } from '../../DoubleRange';
import { NoteItem } from '../../Note';
import { variants } from '../variants';

interface SelectedNoteProps {
    currentNote: NoteAttributes;
    cuts: Cut[];
    caret: number | null;
    moveCaret: (event: ClickEvent) => void;
    onCutsChange: (cuts: Cut[]) => void;
}

/**
 * Selected note is component that drawing current note. It contains DoubleRange and Caret components
 *
 * @param currentNote NoteAttribute of current note
 * @param cuts Array of range cuts
 * @param caret Number of x from start of container
 * @param moveCaret callback to move caret
 * @param onCutsChange callback to change range array
 */

export const SelectedNote = ({
    currentNote,
    cuts,
    caret,
    moveCaret,
    onCutsChange,
}: SelectedNoteProps) => {
    return (
        <AnimatePresence>
            <Card key="selected-note" className="relative" {...variants}>
                <NoteItem attributes={currentNote} />
                <div
                    onClick={moveCaret}
                    className="absolute h-full w-full bg-transparent"
                >
                    <DoubleRange
                        currentNote={currentNote}
                        cuts={cuts}
                        onCutsChange={onCutsChange}
                    />
                    <Caret caret={caret} />
                </div>
            </Card>
        </AnimatePresence>
    );
};
