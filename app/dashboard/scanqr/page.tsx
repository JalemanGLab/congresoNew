'use client'
import { useRef } from 'react';
import usePage from "./usePage";
import qrImage from "../../../public/img/qrImage2.svg";
import { Toaster } from "sonner";

export default function ScanQRPage() {
  const { 
    isScanning, 
    isLoading, 
    scanResult, 
    startScanning, 
    stopScanning, 
    resetScan
  } = usePage();
  
  // Referencia al contenedor de video
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Componente de resultado (éxito o error)
  const ResultComponent = () => {
    if (!scanResult) return null;
    return (
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <div className="text-xl font-bold mb-1">Escaner QR</div>
        <div className="text-sm text-gray-500 mb-6">Registro Congreso Magno 3.0</div>
        
        {scanResult.isSuccess ? (
          // Componente de éxito
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-lg font-semibold mb-1 text-center">{scanResult.description}</div>
            <div className="text-sm text-gray-500 mb-6 text-center">{scanResult.message}</div>
            
            {/* Mostrar el contenido del QR si existe */}
            {scanResult.qrContent && (
              <div className="text-xs bg-gray-100 p-2 rounded w-full text-center mb-6 break-all">
                {scanResult.qrContent}
              </div>
            )}
          </div>
        ) : (
          // Componente de error
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-lg font-semibold mb-1 text-center">{scanResult.description}</div>
            <div className="text-sm text-gray-500 mb-6 text-center">{scanResult.message}</div>
            
            {/* Mostrar el contenido del QR si existe */}
            {scanResult.qrContent && (
              <div className="text-xs bg-gray-100 p-2 rounded w-full text-center mb-6 break-all">
                {scanResult.qrContent}
              </div>
            )}
          </div>
        )}
        
        <button 
          onClick={() => {
            resetScan();
          }}
          className="bg-black text-white font-semibold w-full py-3 rounded-md"
        >
          {scanResult.isSuccess ? 'Escanear Otro Código' : 'Intentar Nuevamente'}
        </button>
      </div>
    );
  };
  
  // Renderizado condicional basado en el estado
  if (scanResult) {
    return (
      <div className="text-background w-full h-full flex flex-col items-center justify-center px-7">
        <Toaster position="top-center" />
        <ResultComponent />
      </div>
    );
  }
  
  return (
    <div className="text-background w-full h-full flex flex-col items-center justify-center px-7 gap-7">
      <Toaster position="top-center" />
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold">Escanear codigo QR</div>
      <div className="text-sm sm:text-base md:text-lg text-gray-400 text-center">
        Coloca el código QR dentro del marco para escanearlo.
        Evita movimientos bruscos para obtener resultados rápidamente.
      </div>
      
      {/* Mostrar la imagen QR solo cuando no se está escaneando */}
      {!isScanning && <img src={qrImage.src} alt="qr" width="200" height="200" />}
      
      {/* Contenedor del video para el escáner nativo */}
      <div 
        id="video-container" 
        ref={videoContainerRef}
        className="w-full max-w-[500px] border-2 border-gray-300 rounded-lg overflow-hidden relative"
        style={{ 
          display: isScanning ? 'block' : 'none',
          minHeight: '400px',
          height: '400px',
          backgroundColor: '#000'
        }}
      >
        {/* Elemento para el lector QR */}
        <div id="reader" className="w-full h-full"></div>
        
        {/* Indicador de carga */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#073118]"></div>
          </div>
        )}
        
        {/* Marco de escaneo */}
        {isScanning && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[250px] h-[250px] border-2 border-[#073118] rounded-lg"></div>
          </div>
        )}
      </div>
      
      {/* Botón para iniciar/detener el escaneo */}
      <button 
        onClick={() => {
          if (isScanning) {
            stopScanning();
          } else {
            startScanning();
          }
        }}
        className={`${isLoading ? 'opacity-70 cursor-not-allowed' : ''} bg-[#073118] hover:bg-[#073118] w-full max-w-[400px] sm:w-[400px] text-white font-semibold  transition-all duration-300 px-4 py-2 rounded-md flex items-center justify-center`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            {isScanning ? 'Deteniendo...' : 'Iniciando...'}
          </>
        ) : (
          isScanning ? 'Detener' : 'Escanear QR'
        )}
      </button>
      
      {/* Nota informativa */}
      <div className="hidden md:block text-sm text-gray-400 text-center mt-4">
        Nota: El escaneo solo funciona desde un teléfono móvil. Si estás en un PC, usa tu teléfono para acceder a esta página y escanear el código QR.
      </div>
    </div>
  );
}
