import { useLayoutEffect, useState } from 'react';
import { Layout } from './layout';
import { NoteAttributes } from './types';
import { getNotes, getPianoNotes } from './services/notes';

function App() {
    const [notes, setNotes] = useState<NoteAttributes[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteAttributes | null>(null);
    const filteredNotes = notes.filter(item => item !== currentNote);

    useLayoutEffect(() => {
        const handleNotes = async () => {
            const notes = await getPianoNotes();
            const result = notes.map(item => getNotes(item));

            setNotes(result);
        };

        handleNotes();
    }, []);

    return (
        <Layout
            currentNote={currentNote}
            notes={filteredNotes}
            onClick={note => setCurrentNote(note)}
            onRemove={() => setCurrentNote(null)}
        />
    );
}

export default App;
