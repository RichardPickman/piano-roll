import { useState } from 'react';
import { Layout } from './Layout';
import { Vegetable } from './types';

const vegetables: Vegetable[] = [
    { id: 1, text: 'Carrot' },
    { id: 2, text: 'Broccoli' },
    { id: 3, text: 'Lettuce' },
    { id: 4, text: 'Cucumber' },
    { id: 5, text: 'Tomato' },
    { id: 6, text: 'Spinach' },
    { id: 7, text: 'Pepper' },
    { id: 8, text: 'Onion' },
    { id: 9, text: 'Potato' },
    { id: 10, text: 'Zucchini' },
    { id: 11, text: 'Eggplant' },
    { id: 12, text: 'Radish' },
    { id: 13, text: 'Celery' },
    { id: 14, text: 'Cauliflower' },
    { id: 15, text: 'Pumpkin' },
    { id: 16, text: 'Beet' },
    { id: 17, text: 'Cabbage' },
    { id: 18, text: 'Garlic' },
];

function App() {
    const [currentNote, setCurrentNote] = useState<Vegetable | null>(null);
    const currentNotes = currentNote
        ? vegetables.filter(item => item.id !== currentNote.id)
        : vegetables;

    return (
        <Layout
            currentNote={currentNote}
            notes={currentNotes}
            onClick={note => setCurrentNote(note)}
            onRemove={() => setCurrentNote(null)}
        />
    );
}

export default App;
