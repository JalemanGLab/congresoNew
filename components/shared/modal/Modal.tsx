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
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);
 
  const Render = ({ children }: { children: ReactNode }): ReactNode | null => {
    return isOpen ? (
      <div onClick={closeModalAction} className="fixed z-[100] left-0 top-0 w-full flex flex-col h-screen overflow-y-auto  bg-white py-8 px-4 sm:px-8">
          <div className='w-full font-semibold items-center flex justify-end px-5 pt-4'>
            <button 
              onClick={closeModalAction}
              className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button> 
          </div>
          <div className="w-[95%] h-[1.5px] min-h-[1.5px] mt-2 mb-2 bg-gray-300"></div>
          {children}
      </div>
    ) : null;
  };

  return { toggleModal, Render, closeModalAction };
};

export default ModalHome;