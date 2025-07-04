import { useEffect, useRef } from 'react';

export const useIntervalFetch = (callback: () => void | Promise<void>, delay: number) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        const id = setInterval(tick, delay);

        return () => clearInterval(id);
    }, [delay]);
};
