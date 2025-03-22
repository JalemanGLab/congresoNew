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
       console.warn("Error al verificar estado del escáner:", e);
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
           try { scanner.pause(); } catch (e) { /* ignore */ }
           
           // Esperar un momento
           await new Promise(resolve => setTimeout(resolve, 200));
           
           // Intentar detener
           await scanner.stop();
         } catch (e) {
           console.warn("Error esperado al detener scanner:", e);
           // No propagar el error
         }
       }
       
       // Marcar como inactivo independientemente del resultado
       isActiveScannerRef.current = false;
     } catch (e) {
       console.error("Error crítico al detener scanner:", e);
     }
   };
   
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
           // Solo intenta detener si está activo
           if (isActiveScannerRef.current) {
             await scanner.stop();
             isActiveScannerRef.current = false;
           }
           // Esperar un momento para asegurar que los recursos se liberen
           await new Promise(resolve => setTimeout(resolve, 300));
         } catch (e) {
           console.log("Error al detener el escáner anterior:", e);
           // Continuar de todos modos
           isActiveScannerRef.current = false;
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
           console.log("QR DETECTADO!");
           console.log("Contenido:", decodedText);
           
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
               console.log("Escáner pausado correctamente");
             } catch (pauseError) {
               console.warn("Error al pausar escáner (no crítico):", pauseError);
             }
             
             // Enviar el ID del QR al servidor y mostrar la respuesta
             console.log("Enviando al servidor:", decodedText);
             const result = await registerQr(decodedText);
             console.log("Respuesta del servidor:", result);
             
             // Procesar la respuesta
             if (result) {
               if (result.success) {
                 setScanResult({
                   success: true,
                   message: '¡Registro Confirmado!',
                   description: result.message || 'Bienvenido al Congreso Magno 3.0',
                   qrContent: decodedText
                 });
                 console.log("Registro exitoso:", result);
               } else {
                 setScanResult({
                   success: false,
                   message: 'Error en el registro',
                   description: result.message || 'No se pudo registrar el código QR.',
                   qrContent: decodedText
                 });
                 console.warn("Error en el registro:", result);
               }
             } else {
               console.error("Respuesta del servidor vacía o inválida");
               setScanResult({
                 success: false,
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
             console.error("Error al registrar QR:", error);
             
             // Mostrar error detallado
             let errorMessage = 'Error desconocido';
             if (error instanceof Error) {
               errorMessage = error.message;
               console.error("Detalles del error:", error.stack);
             }
             
             setScanResult({
               success: false,
               message: 'Error en el servidor',
               description: `No se pudo registrar el QR: ${errorMessage}`,
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
       ).then(() => {
         // Si el escáner inicia correctamente, marcamos como activo
         isActiveScannerRef.current = true;
         // Desactivar el loader después de iniciar correctamente
         setIsLoading(false);
       }).catch(err => {
         console.error("Error al iniciar la cámara:", err);
         toast.error('Error de cámara', {
           description: 'Verifica los permisos de la cámara',
           duration: 3000
         });
         setIsScanning(false);
         setIsLoading(false); // Desactivar loader en caso de error
         setScanner(null); // Limpiar la referencia al escáner en caso de error
       });
       
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
         setIsLoading(true);
         
         // Usar el método seguro para detener el escáner
         await safeStopScanner(scanner);
         
         // Actualizar estados después de un breve retraso
         setTimeout(() => {
           setScanner(null);
           setIsScanning(false);
           setIsLoading(false);
           
           // Limpiar el elemento DOM del lector
           const readerElement = document.getElementById("reader");
           if (readerElement) {
             readerElement.innerHTML = '';
           }
         }, 500);
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
         .catch(console.error);
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
     isRegistering, // Exponemos el nuevo estado
     scanResult,
     qrData,
     startScanning,
     stopScanning,
     resetScan,
     setIsScanning,
     errorCount: errorCountRef.current // Exponer contador para debugging
   }
};

export default usePage;