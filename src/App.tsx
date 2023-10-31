import { AnimatePresence, m, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from './components/Card';

type Vegetable = {
    id: number;
    text: string;
};

const LAYOUT_GAP = 16;

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

// const useContainerViewBox = (box: HTMLElement | null) => {
//     const [dimensions, setDimensions] = useState<DOMRect | null>(null);

//     const calculateViewbox = useCallback(() => {
//         if (box) {
//             const data = box.getBoundingClientRect();

//             setDimensions(data);
//         }
//     }, [box]);

//     useEffect(() => {
//         window.addEventListener('resize', calculateViewbox);

//         return () => {
//             window.removeEventListener('resize', calculateViewbox);
//         };
//     }, [calculateViewbox]);

//     return dimensions;
// };

const config = {
    stiffness: 200,
    damping: 15,
    mass: 0.1,
};

function App() {
    const [currentNote, setCurrentNote] = useState<Vegetable | null>(null);
    const [dimensions, setDimensions] = useState<DOMRect | null>(null);
    const currentVegetables = currentNote
        ? vegetables.filter(item => item.id !== currentNote.id)
        : vegetables;

    const container = useRef<HTMLDivElement | null>(null);

    const PRIMARY_WIDTH = useSpring(0, config);
    const SECONDARY_WIDTH = useSpring(0, config);
    const ITEM_WIDTH = useSpring(0, config);

    const calculate = useCallback(() => {
        if (dimensions) {
            const oneFourth = dimensions.width / 4;
            const primaryWidth = oneFourth * 3 - LAYOUT_GAP;

            PRIMARY_WIDTH.set(currentNote ? primaryWidth : 0);
            SECONDARY_WIDTH.set(currentNote ? oneFourth : dimensions.width);
            ITEM_WIDTH.set(
                currentNote ? oneFourth : dimensions.width / 3 - LAYOUT_GAP,
            );
        }
    }, [ITEM_WIDTH, PRIMARY_WIDTH, SECONDARY_WIDTH, currentNote, dimensions]);

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
    }, [currentNote, calculate]);

    return (
        <main className="relative flex h-screen justify-center px-6 py-4 text-white">
            <button
                className="absolute left-0 top-0"
                onClick={() => setCurrentNote(null)}
            >
                remove
            </button>
            <div
                ref={container}
                className="relative mx-auto flex h-full max-w-7xl"
                style={{ gap: LAYOUT_GAP }}
            >
                <m.div
                    className="empty:hidden"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            delay: 1,
                        },
                    }}
                    style={{ width: PRIMARY_WIDTH }}
                >
                    <AnimatePresence>
                        {currentNote && (
                            <m.div
                                exit={{
                                    top: 0,
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
                    {currentVegetables.map(item => (
                        <AnimatePresence key={item.text}>
                            <m.div
                                className="aspect-video"
                                exit={{
                                    top: dimensions?.top,
                                    left: dimensions?.left,
                                    right: dimensions?.right,
                                    bottom: dimensions?.bottom,
                                    display: 'absolute',
                                }}
                                onClick={() => setCurrentNote(item)}
                                style={{ width: ITEM_WIDTH }}
                            >
                                <Card>{item.text}</Card>
                            </m.div>
                        </AnimatePresence>
                    ))}
                </m.div>
            </div>
        </main>
    );
}

export default App;
