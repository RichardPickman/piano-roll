import { Line, Note, NoteAttributes, Rect } from '../types';

const fetchNotes = async () => await fetch('https://pianoroll.ai/random_notes');

export const getPianoNotes = async () => {
    try {
        const response = await fetchNotes();

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const sequences: Note[] = await response.json();
        const result = [];

        for (let it = 0; it < 20; it++) {
            const start = it * 60;
            const end = start + 60;
            const res = sequences.slice(start, end);

            result.push(res);
        }

        return result || [];
    } catch (error) {
        console.error('Error loading data:', error);

        return [];
    }
};

type Color = { r: number; g: number; b: number };

const generateGradientTable = (
    startColor: Color,
    endColor: Color,
    steps: number,
) => {
    const gradientTable = [];
    for (let i = 0; i < steps; i++) {
        const r =
            startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
        const g =
            startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
        const b =
            startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
        gradientTable.push(
            `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
        );
    }
    return gradientTable;
};

const backgroundStartColor = { r: 93, g: 181, b: 213 };
const backgroundEndColor = { r: 21, g: 65, b: 81 };

const noteStartColor = { r: 66, g: 66, b: 61 };
const noteEndColor = { r: 28, g: 28, b: 26 };

const backgroundColormap = generateGradientTable(
    backgroundStartColor,
    backgroundEndColor,
    128,
);
const noteColormap = generateGradientTable(noteStartColor, noteEndColor, 128);

const drawEmptyPianoRoll = (pitch_min: number, pitch_max: number) => {
    const pitch_span = pitch_max - pitch_min;
    const result = {
        lines: [] as Line[],
        rectangulars: [] as Rect[],
    };

    for (let it = pitch_min; it <= pitch_max + 1; it++) {
        if ([1, 3, 6, 8, 10].includes(it % 12)) {
            result.rectangulars.push({
                x: 0,
                y: 1 - (it - pitch_min) / pitch_span,
                width: 2,
                height: 1 / pitch_span,
                fill: backgroundColormap[12],
                fillOpacity: 0.666,
            });
        }

        const y = 1 - (it - pitch_min) / pitch_span + 1 / pitch_span;

        result.lines.push({
            x1: 0,
            y1: y,
            x2: 2,
            y2: y,
            strokeWidth: it % 12 === 0 ? '0.003' : '0.001',
            stroke: 'black',
            fill: backgroundColormap[12],
            fillOpacity: 0.666,
        });
    }

    return result;
};

const timeToX = (time: number, end: number) => time / end;

export const getNotes = (sequence: Note[]): NoteAttributes => {
    const start = sequence[0].start;
    const end = sequence[sequence.length - 1].end - start;
    const pitches = sequence.map(note => note.pitch);

    // Make it at lest 2 octaves (2 * 12)
    let pitch_min = Math.min(...pitches);
    let pitch_max = Math.max(...pitches);
    let pitch_span = pitch_max - pitch_min;

    // If the span is too low, we have to extend it equally on both sides
    if (pitch_span < 24) {
        const diff = 24 - pitch_span;
        const low = Math.ceil(diff / 2);
        const high = Math.floor(diff / 2);

        pitch_min -= low;
        pitch_max += high;
    }

    // And margin up and down
    pitch_min -= 0;
    pitch_max += 0;
    pitch_span = pitch_max - pitch_min;
    const height = 1 / pitch_span;
    const notes: Rect[] = [];
    const emptyLines = drawEmptyPianoRoll(pitch_min, pitch_max);

    for (let i = 0; i < sequence.length - 1; i++) {
        const note = sequence[i];
        const x = timeToX(note.start - start, end) * 2;
        const width = timeToX(note.end - note.start, end);

        // Computers draw upside down
        const y = 1 - (note.pitch - pitch_min) / pitch_span;
        const color = noteColormap[note.velocity];
        const data = {
            x,
            y,
            width,
            height,
            fill: color,
        };

        notes.push(data);
    }

    return {
        id: Math.random(),
        rectangulars: notes,
        blanks: emptyLines.rectangulars,
        lines: emptyLines.lines,
    };
};

/**
 * Function is getting the DOMRect to calculate current selection percentage. Basically it gets percentage of first and second pointers, then compares them with NoteAttributes X and Width - X.
 *
 * @param currentNote NoteAttributes of notes itself
 * @param rect DOMRect of current selection
 * @param left number of the first pointer
 * @param right number of the second pointer
 *
 * @returns amount of notes within selection
 *
 */
export const getNotesAmount = (
    currentNote: NoteAttributes,
    rect: DOMRect,
    left: number,
    right: number,
) => {
    const onePercent = rect.width / 100;
    const minPointer = left / onePercent;
    const maxPointer = right / onePercent;

    const oneNotePercent = 2 / 100;
    const start = oneNotePercent * minPointer;
    const end = oneNotePercent * maxPointer;

    let amount = 0;

    currentNote.rectangulars.forEach(item => {
        if (item.x > start && item.x + item.width < end) {
            amount++;
        }
    });

    return amount;
};
