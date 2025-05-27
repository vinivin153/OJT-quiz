import { create } from 'zustand';

type StepStore = {
  title: string;
  step: number;
  nextStep: () => void;
  initStep: () => void;
  setTitle: (title: string) => void;
};

const useStepStore = create<StepStore>((set) => ({
  step: 1,
  title: '',
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  initStep: () => set({ step: 1 }),
  setTitle: (title: string) => set({ title }),
}));

export default useStepStore;
