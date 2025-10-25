import {create} from 'zustand';

interface MacBookStore {
    color: string;
    setColor: (color: string) => void;
    scale: number;
    setScale: (scale: number) => void;
    reset: () => void;
}

const useMacBookStore = create<MacBookStore>((set) => ({
    color: '#2e2c2e',
    setColor: (color: string) => set({color}),

    scale: 0.08,
    setScale: (scale: number) => set({scale}),

    reset: () => set({color: '#2e2c2e', scale: 0.08}),
}));

export default useMacBookStore;