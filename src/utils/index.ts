import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClickEvent } from '../types';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const getPointerPosition = (event: ClickEvent) =>
    event.clientX - event.currentTarget.getBoundingClientRect().left;

export const getRandomRGB = () => ({
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255),
});
