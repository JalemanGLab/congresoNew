import { create } from "zustand";

interface RegistrationStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useRegistration = create<RegistrationStore>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useRegistration;