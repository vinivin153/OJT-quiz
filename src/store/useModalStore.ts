import type { MODAL_TYPES } from 'constants/constant';
import { create } from 'zustand';

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;

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
