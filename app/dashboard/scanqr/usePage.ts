import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { toast } from 'sonner'

const usePage = () => {
   const [isScanning, setIsScanning] = useState(false);
   const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [scanResult, setScanResult] = useState<{
     success: boolean;
     message: string;
     description?: string;
     qrContent?: string;
   } | null>(null);
   // Nuevo estado para guardar el contenido del QR
   const [qrData, setQrData] = useState<string>("");
   // Referencia para almacenar el error actual
   const errorRef = useRef<string | null>(null);
   // Contador de errores para debugging
   const errorCountRef = useRef(0);
   
   // Efecto para limpiar errores al desmontar
   useEffect(() => {
     return () => {
       if (scanner) {
         scanner.stop().catch(console.error);
       }
     };
   }, [scanner]);
 
   const startScanning = async () => {
     try {
       // Reiniciar el resultado del escaneo
       setScanResult(null);
       
       // Reiniciar contador de errores
       errorCountRef.current = 0;
       errorRef.current = null;
       
       // Activar el loader
       setIsLoading(true);
       
       // Asegurarse de que el escáner anterior esté completamente detenido
       if (scanner) {
         try {
           await scanner.stop();
           // Esperar un momento para asegurar que los recursos se liberen
           await new Promise(resolve => setTimeout(resolve, 300));
         } catch (e) {
           console.log("Error al detener el escáner anterior:", e);
           // Continuar de todos modos
         }
       }
       
       // Limpiar el elemento DOM del lector
       const readerElement = document.getElementById("reader");
       if (readerElement) {
         readerElement.innerHTML = '';
       } else {
         console.error("Elemento con ID 'reader' no encontrado");
         toast.error('Error de configuración', {
           description: 'No se encontró el elemento para el escáner QR',
           duration: 3000
         });
         setIsLoading(false);
         return;
       }
       
       // Crear una nueva instancia después de limpiar
       const html5QrCode = new Html5Qrcode("reader");
       setScanner(html5QrCode);
       setIsScanning(true);
 
       await html5QrCode.start(
         { facingMode: "environment" },
         {
           fps: 5, // Reducir FPS para disminuir errores
           qrbox: { width: 250, height: 250 },
           aspectRatio: 1.0,
           disableFlip: true, // Desactivar flip para reducir procesamiento
         },
         (decodedText) => {
           console.log("QR DETECTADO!");
           console.log("Contenido:", decodedText);
           
           // Guardar el contenido del QR en el estado
           setQrData(decodedText);
           
           // Mostrar el contenido en un toast
           toast.success('QR Escaneado', {
             description: `Contenido: ${decodedText}`,
             duration: 5000
           });
           
           // Mantener el loader activo por un tiempo mínimo
           setIsLoading(true);
           
           // Validar el contenido del QR (ejemplo básico)
           const isValidQR = decodedText && decodedText.length > 0;
           
           // Usar setTimeout para asegurar que el loader se muestre por al menos 1.5 segundos
           setTimeout(() => {
             if (isValidQR) {
               // Establecer resultado exitoso
               setScanResult({
                 success: true,
                 message: '¡Registro Confirmado!',
                 description: 'Bienvenido al Congreso Magno 3.0',
                 qrContent: decodedText
               });
             } else {
               // Establecer resultado de error
               setScanResult({
                 success: false,
                 message: 'Error',
                 description: 'Código QR inválido. Por favor intentar nuevamente.'
               });
             }
             
             html5QrCode.stop().then(() => {
               setIsScanning(false);
               setIsLoading(false);
               setScanner(null);
             }).catch(err => {
               console.error("Error al detener después de escaneo:", err);
               setIsScanning(false);
               setIsLoading(false);
               setScanner(null);
             });
           }, 1500);
         },
         // Función de error completamente reescrita
         (error) => {
           // Ignorar TODOS los errores excepto los críticos
           if (typeof error === 'string') {
             // Solo registrar el error si es diferente al anterior
             if (errorRef.current !== error) {
               errorRef.current = error;
               console.log("Tipo de error:", error);
               
               // Solo mostrar errores críticos de permisos
               if (error.includes("PERMISSION") || 
                   error.includes("denied") ||
                   error.includes("NotAllowedError") ||
                   error.includes("NotFoundError")) {
                 
                 toast.error('Error de permisos', {
                   description: 'Por favor, habilita la cámara para continuar',
                   duration: 5000
                 });
                 
                 // Detener el escáner en caso de error crítico
                 html5QrCode.stop().then(() => {
                   setIsScanning(false);
                 }).catch(() => {
                   setIsScanning(false);
                 });
               }
             }
             
             // Incrementar contador para debugging
             errorCountRef.current++;
             
             // Si hay demasiados errores, reiniciar el escáner
             if (errorCountRef.current > 100) {
               console.log("Demasiados errores, reiniciando escáner...");
               errorCountRef.current = 0;
               
               html5QrCode.stop().then(() => {
                 setTimeout(() => {
                   startScanning();
                 }, 1000);
               }).catch(() => {
                 setIsScanning(false);
               });
             }
           }
           
           // No mostrar ningún error al usuario
           return;
         }
       ).catch(err => {
         console.error("Error al iniciar la cámara:", err);
         toast.error('Error de cámara', {
           description: 'Verifica los permisos de la cámara',
           duration: 3000
         });
         setIsScanning(false);
         setIsLoading(false); // Desactivar loader en caso de error
         setScanner(null); // Limpiar la referencia al escáner en caso de error
       });
       
       // Desactivar el loader después de iniciar correctamente
       setIsLoading(false);
       
     } catch (err) {
       console.error("Error general:", err);
       toast.error('Error al iniciar', {
         description: 'No se pudo iniciar el escáner',
         duration: 3000
       });
       setIsScanning(false);
       setIsLoading(false); // Desactivar loader en caso de error
       setScanner(null); // Limpiar la referencia al escáner en caso de error
     }
   };
 
   const stopScanning = async () => {
     if (scanner) {
       try {
         setIsLoading(true); // Activar loader mientras se detiene
         
         // Usar setTimeout para asegurar que el loader se muestre por al menos 1 segundo
         setTimeout(async () => {
           try {
             await scanner.stop();
           } catch (err) {
             console.error("Error al detener el escáner:", err);
           } finally {
             setScanner(null);
             setIsScanning(false);
             setIsLoading(false); // Desactivar loader después del tiempo mínimo
             
             // Limpiar el elemento DOM del lector
             const readerElement = document.getElementById("reader");
             if (readerElement) {
               readerElement.innerHTML = '';
             }
           }
         }, 1000);
       } catch (err) {
         console.error("Error al detener el escáner:", err);
         setIsLoading(false); // Desactivar loader en caso de error
         setScanner(null);
         setIsScanning(false);
       }
     } else {
       setIsScanning(false);
       setIsLoading(false);
     }
   };
 
   const resetScan = () => {
     setScanResult(null);
   };
 
   return {
     isScanning,
     isLoading,
     scanResult,
     qrData, // Exportar el nuevo estado
     startScanning,
     stopScanning,
     resetScan,
     setIsScanning,
     errorCount: errorCountRef.current // Exponer contador para debugging
   }
};

export default usePage;