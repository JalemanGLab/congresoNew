import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { toast } from 'sonner'
// Importamos el servicio que hemos creado
import { registerQr } from '../../../services/axios';


const usePage = () => {
   const [isScanning, setIsScanning] = useState(false);
   const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [scanResult, setScanResult] = useState<{
     isSuccess: boolean;
     message: string;
     description?: string;
     qrContent?: string;
     data?: any[];
   } | null>(null);
   // Nuevo estado para guardar el contenido del QR
   const [qrData, setQrData] = useState<string>("");
   // Referencia para almacenar el error actual
   const errorRef = useRef<string | null>(null);
   // Contador de errores para debugging
   const errorCountRef = useRef(0);
   
   // Nuevo estado para rastrear el proceso de registro
   const [isRegistering, setIsRegistering] = useState(false);
   
   // Añadimos un estado para rastrear si el escáner está realmente activo
   const isActiveScannerRef = useRef(false);
   
   // Función auxiliar para verificar si el escáner está activo de manera segura
   const isScannerActive = (scanner: Html5Qrcode | null): boolean => {
     if (!scanner) return false;
     try {
       // Verificación indirecta - no hay forma directa de consultar el estado
       return isActiveScannerRef.current;
     } catch (e) {
       return false;
     }
   };
   
   // Función segura para detener el escáner
   const safeStopScanner = async (scanner: Html5Qrcode | null): Promise<void> => {
     if (!scanner) return;
     
     try {
       // Solo intentar pausar/detener si creemos que está activo
       if (isActiveScannerRef.current) {
         try {
           // Intentar pausar primero (ignora errores)
           try { 
             scanner.pause(true); 
             await new Promise(resolve => setTimeout(resolve, 200));
           } catch (e) { 
             /* ignorar errores de pausa */ 
           }
           
           // Intentar detener con manejo de errores mejorado
           try {
             await scanner.stop();
           } catch (stopError) {
             // No propagar este error
           }
         } catch (e) {
           // No propagar el error
         }
       }
       
       // Marcar como inactivo independientemente del resultado
       isActiveScannerRef.current = false;
     } catch (e) {
       // Asegurarnos de que el estado se actualice incluso en caso de error
       isActiveScannerRef.current = false;
     }
   };
   
   // Efecto para limpiar errores al desmontar
   useEffect(() => {
     return () => {
       // Función de limpieza cuando el componente se desmonta
       if (scanner) {
         try {
           // Usar el método seguro para detener el escáner
           safeStopScanner(scanner).catch(() => {
             // No hacer nada con el error
           });
         } catch (e) {
           // No hacer nada con el error
         }
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
           // Solo intenta detener si está activo
           if (isActiveScannerRef.current) {
             await scanner.stop();
             isActiveScannerRef.current = false;
           }
           // Esperar un momento para asegurar que los recursos se liberen
           await new Promise(resolve => setTimeout(resolve, 300));
         } catch (e) {
           // Continuar de todos modos
           isActiveScannerRef.current = false;
         }
       }
       
       // Limpiar el elemento DOM del lector
       const readerElement = document.getElementById("reader");
       if (readerElement) {
         readerElement.innerHTML = '';
       } else {
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
       
       // Inicialmente no está activo hasta que comience correctamente
       isActiveScannerRef.current = false;
 
       await html5QrCode.start(
         { 
           facingMode: "environment" 
         },
         {
           fps: 5,
           qrbox: { width: 250, height: 250 },
           aspectRatio: 1.0,
           disableFlip: true,
         },
         async (decodedText) => {
           // Marcar que el escáner ya no debería estar activo
           isActiveScannerRef.current = false;
           
           // Guardar el contenido del QR en el estado
           setQrData(decodedText);
           
           // Mostrar el contenido en un toast
           toast.success('QR Escaneado', {
             description: `Contenido: ${decodedText}`,
             duration: 5000
           });
           
           // Indicar que estamos registrando
           setIsRegistering(true);
           
           try {
             // Pausar el escáner de forma segura
             try {
               html5QrCode.pause();
             } catch (pauseError) {
               // Ignorar error
             }
             
             // Enviar el ID del QR al servidor y mostrar la respuesta
             const result = await registerQr(decodedText);
             
             // Procesar la respuesta
             if (result) {
               if (result.status === true || result.success === true) {
                 setScanResult({
                   isSuccess: true,
                   message: result.message || 'Entrada registrada correctamente',
                   description: result.data?.[0] 
                     ? `Bienvenido ${result.data[0].first_name || ''} ${result.data[0].last_name || ''}`
                     : 'Registro exitoso',
                   qrContent: decodedText,
                   data: result.data
                 });
               } else {
                 setScanResult({
                   isSuccess: false,
                   message: result.message || 'Error al registrar entrada',
                   description: 'No se pudo registrar la entrada',
                   qrContent: decodedText
                 });
               }
             } else {
               setScanResult({
                 isSuccess: false,
                 message: 'Error en el registro',
                 description: 'Respuesta del servidor inválida',
                 qrContent: decodedText
               });
             }
             
             // Detener el proceso de registro
             setIsRegistering(false);
             
             // Asegurarnos de que el escáner esté detenido sin errores
             await safeStopScanner(html5QrCode);
             
             // Actualizar estados
             setIsScanning(false);
             setIsLoading(false);
             setScanner(null);
           } catch (error) {
             let errorMessage = 'Error desconocido';
             if (error instanceof Error) {
               errorMessage = error.message;
             }
             
             setScanResult({
               isSuccess: false,
               message: 'Error de conexión',
               description: 'No se pudo conectar con el servidor',
               qrContent: decodedText
             });
             
             setIsRegistering(false);
             setIsLoading(false);
             
             // Utilizar el método seguro para detener el escáner
             await safeStopScanner(html5QrCode);
             setIsScanning(false);
             setScanner(null);
           }
         },
         // Función de error completamente reescrita
         (error) => {
           // Ignorar TODOS los errores excepto los críticos
           if (typeof error === 'string') {
             // Solo registrar el error si es diferente al anterior
             if (errorRef.current !== error) {
               errorRef.current = error;
               
               // Solo mostrar errores críticos de permisos
               if (error.includes("PERMISSION") || 
                   error.includes("denied") ||
                   error.includes("NotAllowedError") ||
                   error.includes("NotFoundError")) {
                 
                 // Mostrar mensaje amigable al usuario
                 toast.error('Permiso de cámara requerido', {
                   description: 'Por favor, permite el acceso a la cámara para escanear códigos QR',
                   duration: 5000
                 });
                 
                 // Detener el escáner de forma segura
                 safeStopScanner(html5QrCode).then(() => {
                   setIsScanning(false);
                   setIsLoading(false);
                   setScanner(null);
                 }).catch(() => {
                   setIsScanning(false);
                   setIsLoading(false);
                   setScanner(null);
                 });
                 
                 return;
               }
             }
             
             // Incrementar contador para debugging
             errorCountRef.current++;
             
             // Si hay demasiados errores, reiniciar el escáner
             if (errorCountRef.current > 100) {
               errorCountRef.current = 0;
               
               safeStopScanner(html5QrCode).then(() => {
                 setTimeout(() => {
                   startScanning();
                 }, 1000);
               }).catch(() => {
                 setIsScanning(false);
                 setIsLoading(false);
                 setScanner(null);
               });
             }
           }
           
           // No mostrar ningún error al usuario
           return;
         }
       ).then(() => {
         // Si el escáner inicia correctamente, marcamos como activo
         isActiveScannerRef.current = true;
         // Desactivar el loader después de iniciar correctamente
         setIsLoading(false);
       }).catch(err => {
         // Manejar errores de inicio de cámara de forma más amigable
         let errorMessage = '';
         
         // Verificar si es un error de permisos
         if (err && typeof err === 'object' && 'name' in err) {
           const errorName = String(err.name || '');
           
           if (errorName.includes('NotAllowedError') || 
               errorName.includes('PermissionDenied') || 
               errorName.includes('Permission')) {
             
             errorMessage = 'Necesitamos acceso a la cámara para escanear códigos QR';
           } else {
             errorMessage = 'Verifica los permisos de la cámara';
           }
         } else {
           errorMessage = 'No se pudo iniciar la cámara';
         }
         
         toast.error('Acceso a cámara requerido', {
           description: errorMessage,
           duration: 3000
         });
         
         setIsScanning(false);
         setIsLoading(false);
         setScanner(null);
       });
       
     } catch (err) {
       toast.error('Error al iniciar', {
         description: 'No se pudo iniciar el escáner',
         duration: 3000
       });
       setIsScanning(false);
       setIsLoading(false);
       setScanner(null);
     }
   };
 
   const stopScanning = async () => {
     if (scanner) {
       try {
         setIsLoading(true);
         
         // Verificar si el escáner está activo antes de intentar detenerlo
         if (isActiveScannerRef.current) {
           try {
             // Primero intentamos pausar el escáner
             try {
               scanner.pause(true);
               await new Promise(resolve => setTimeout(resolve, 200));
             } catch (pauseError) {
               // Continuar con la detención aunque falle la pausa
             }
             
             // Luego intentamos detenerlo con un manejo de errores mejorado
             await scanner.stop().catch(stopError => {
               // No propagar este error
             });
           } catch (e) {
             // No propagar este error
           }
         }
         
         // Marcar como inactivo independientemente del resultado
         isActiveScannerRef.current = false;
         
         // Actualizar estados después de un breve retraso
         setTimeout(() => {
           setScanner(null);
           setIsScanning(false);
           setIsLoading(false);
           
           // Limpiar el elemento DOM del lector de manera segura
           try {
             const readerElement = document.getElementById("reader");
             if (readerElement) {
               readerElement.innerHTML = '';
             }
           } catch (domError) {
             // No crítico
           }
         }, 500);
       } catch (err) {
         // Asegurarnos de que los estados se actualicen incluso en caso de error
         setIsLoading(false);
         setScanner(null);
         setIsScanning(false);
       }
     } else {
       // Si no hay escáner activo, simplemente actualizamos los estados
       setIsScanning(false);
       setIsLoading(false);
     }
   };
 
   const resetScan = () => {
     setScanResult(null);
     // Al resetear, asegurarse de que todos los estados vuelvan a su valor inicial
     setIsScanning(false);
     setIsLoading(false);
     setIsRegistering(false);
     
     // Usar el método seguro para detener el escáner
     if (scanner) {
       safeStopScanner(scanner)
         .then(() => {
           setScanner(null);
           
           // Limpiar el elemento DOM del lector
           const readerElement = document.getElementById("reader");
           if (readerElement) {
             readerElement.innerHTML = '';
           }
         })
         .catch(() => {
           // Manejar error silenciosamente
         });
     } else {
       // Limpiar el elemento DOM del lector
       const readerElement = document.getElementById("reader");
       if (readerElement) {
         readerElement.innerHTML = '';
       }
     }
     
     // Reiniciar el contador de errores
     errorCountRef.current = 0;
     errorRef.current = null;
   };
 
   return {
     isScanning,
     isLoading,
     isRegistering,
     scanResult,
     qrData,
     startScanning,
     stopScanning,
     resetScan,
     setIsScanning,
     errorCount: errorCountRef.current
   }
};

export default usePage;