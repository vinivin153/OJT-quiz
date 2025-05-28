import { create } from 'zustand';

type HeaderStore = {
  title: string;
  leftChance: number;
  setTitle: (title: string) => void;
  decreaseLeftChance: () => void;
};

const useHeaderStore = create<HeaderStore>((set) => ({
  title: '',
  leftChance: 3,
  setTitle: (title: string) => set({ title }),
  decreaseLeftChance: () => set((state) => ({ leftChance: Math.max(state.leftChance - 1, 0) })),
}));

export default useHeaderStore;
