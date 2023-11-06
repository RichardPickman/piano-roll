import { DELAY } from '../../../constants';

export const variants = {
    initial: { display: 'none' },
    animate: {
        display: 'flex',
        transition: { delay: DELAY },
    },
    exit: {
        opacity: 0,
    },
};
