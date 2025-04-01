import { ReactNode, useEffect } from 'react';
import useModal from './useModal';
import { ModalOptions, ModalReturn } from './type';

const ModalHome = (options: ModalOptions = {}): ModalReturn => {
  const {
    isOpen,
    toggleModal,
    closeModalAction
  } = useModal(options);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const Render = ({ children }: { children: ReactNode }): ReactNode | null => {
    return isOpen && (
      <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full bg-gradient-to-br from-[#031a10] to-[#073723] flex flex-col overflow-hidden"
        >
          <div className='w-full font-semibold items-center flex justify-end px-5 pt-4'>
            <button
              onClick={closeModalAction}
              className="text-green-400 hover:text-green-600 transition-colors hover:bg-green-500/20 rounded-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex justify-center items-start overflow-hidden m-5 lg:mb-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return { toggleModal, Render, closeModalAction };
};

export default ModalHome;
