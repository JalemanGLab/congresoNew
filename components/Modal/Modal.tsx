import  {ReactNode, useEffect } from 'react';
import useModalHome from './UseModal';

interface ModalOptions {  [key: string]: any; }

interface ModalReturn {
	toggleModal: () => void;
	closeModalAction: () => void;
	Render: ({ children }: { children: ReactNode }) => ReactNode | null;
}

const Modal = (options: ModalOptions = {}): ModalReturn => {
	const {
		isOpen,
		toggleModal,
		closeModalAction,
		classModal
	} = useModalHome(options)

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('overflow-y-hidden');
    } else {
      document.documentElement.classList.remove('overflow-y-hidden');
    }
    return () => {
      document.documentElement.classList.remove('overflow-y-hidden');
    };
  }, [isOpen]);
 
  const Render = ({ children }: { children: ReactNode }): ReactNode | null => {
    return isOpen ? (
      <div className="fixed inset-0 z-[100] overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center">
          <div className="fixed inset-0 bg-[rgba(0,0,0,.3)]" onClick={closeModalAction}></div>
          <div 
            onClick={(e)=>e.stopPropagation()} 
            className={`${classModal} relative w-full max-w-2xl transform overflow-hidden transition-all`}
          >
            <div className='w-full font-semibold items-center flex justify-between px-5 pt-4'>
              <div className='text-2xl'>{options.title || null}</div>
              <button 
                onClick={closeModalAction}
                className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
              </button> 
            </div>
            {children}
          </div>
        </div>
      </div>
    ) : null;
  };

  return { toggleModal, Render, closeModalAction };
};

export default Modal;