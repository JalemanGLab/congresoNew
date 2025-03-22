import { ReactNode } from 'react';

export interface ModalOptions {
  [key: string]: any;
}

export interface ModalReturn {
  toggleModal: () => void;
  closeModalAction: () => void;
  Render: ({ children }: { children: ReactNode }) => ReactNode | null;
}
