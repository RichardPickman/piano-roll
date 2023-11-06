export interface Note {
    start: number;
    end: number;
    pitch: number;
    duration: number;
    velocity: number;
}

export interface CurrentNote {
    id: number;
    notes: Note[];
}

export type Attributes = {
    fill: string;
    fillOpacity?: number;
};

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
} & Attributes;

export type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeWidth: string;
    stroke: string;
} & Attributes;

export type NoteAttributes = {
    id: number;
    rectangulars: Rect[];
    blanks: Rect[];
    lines: Line[];
};
