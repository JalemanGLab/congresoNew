import  {ReactNode, useEffect } from 'react';
import useModal from './useModal';

interface ModalOptions {  [key: string]: any; }

interface ModalReturn {
	toggleModal: () => void;
	closeModalAction: () => void;
	Render: ({ children }: { children: ReactNode }) => ReactNode | null;
}

const ModalHome = (options: ModalOptions = {}): ModalReturn => {
	const {
		isOpen,
		toggleModal,
		closeModalAction,
		classModal
	} = useModal(options)

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
      <div className="fixed inset-0 z-[9999] bg-black/50 overflow-hidden">
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="w-full h-full bg-white overflow-y-auto"
        >
          <div className='w-full font-semibold items-center flex justify-end px-5 pt-4'>
            <button 
              onClick={closeModalAction}
              className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button> 
          </div>
          <div className="w-[95%] h-[1.5px] min-h-[1.5px] mt-2 mb-2 bg-gray-300 mx-auto"></div>
          <div className="px-8 py-6">
            {children}
          </div>
        </div>
      </div>
    ) 
  };

  return { toggleModal, Render, closeModalAction };
};

export default ModalHome;