import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { MouseEvent } from 'react';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const getPointerPosition = (event: MouseEvent<HTMLDivElement>) =>
    event.clientX - event.currentTarget.getBoundingClientRect().left;

export const getRandomRGB = () => ({
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255),
});
