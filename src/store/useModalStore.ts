import { create } from 'zustand';

type ModalType = 'correct' | 'incorrect' | null;

type ModalStore = {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  openModal: (type) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}));

export default useModalStore;
