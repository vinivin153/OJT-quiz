import { create } from 'zustand';

type ModalType = 'correct' | 'incorrect' | 'gameOver' | null;

type ModalStore = {
  modalType: ModalType;
  modalMessage: string;
  openModal: (type: ModalType, message: string) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  modalMessage: '',
  openModal: (type, message) => set({ modalType: type, modalMessage: message }),
  closeModal: () => set({ modalType: null }),
}));

export default useModalStore;
