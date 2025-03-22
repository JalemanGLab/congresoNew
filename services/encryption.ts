import CryptoJS from 'crypto-js';

// Clave secreta para encriptación (en producción, usar una clave segura y almacenarla en variables de entorno)
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-secret-key';

// Funciones de utilidad para encriptación
export const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Funciones para manejar el localStorage de forma segura
export const secureStorage = {
    setItem: (key: string, value: string) => {
        const encryptedValue = encryptData(value);
        localStorage.setItem(key, encryptedValue);
    },
    getItem: (key: string): string | null => {
        const encryptedValue = localStorage.getItem(key);
        if (!encryptedValue) return null;
        return decryptData(encryptedValue);
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    }
}; 