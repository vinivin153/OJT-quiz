import { create } from 'zustand';

type StepStore = {
  step: number;
  nextStep: () => void;
  initStep: () => void;
};

const useStepStore = create<StepStore>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  initStep: () => set({ step: 1 }),
}));

export default useStepStore;
