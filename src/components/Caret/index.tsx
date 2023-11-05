import { MouseEvent, useState } from 'react';

export const Caret = () => {
    const [pointer, setPointer] = useState<number | null>();

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        setPointer(event.clientX - rect.left);
    };

    return (
        <div onClick={onClick}>
            {!!pointer && (
                <div
                    className="absolute h-full w-[1px]"
                    style={{
                        left: pointer,
                    }}
                />
            )}
        </div>
    );
};
