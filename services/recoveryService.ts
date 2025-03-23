import axios from './axios';

interface RecoveryResponse {
    status: number;
    message: string;
}

interface VerifyCodeResponse {
    status: boolean;
    message: string;
    resetToken?: string;
}

export const recoveryService = {
    // Enviar código de recuperación
    sendRecoveryCode: async (email: string): Promise<RecoveryResponse> => {
        try {
            const response = await axios.post<RecoveryResponse>('auth/recovery', {
                email
            });
            
            return {
                status: response.status, // Usamos el código HTTP directamente (201 = éxito)
                message: response.data.message
            };
        } catch (error: any) {
            console.error('Error en recoveryService:', error.response?.data);
            throw {
                status: error.response?.status || 400,
                message: error.response?.data?.message || 'Error al enviar el código'
            };
        }
    },

    // Verificar código
    verifyCode: async (email: string, code: string): Promise<VerifyCodeResponse> => {
        try {
            const response = await axios.post('auth/validate-otp', {
                email,
                otp: code
            });
            
            return {
                status: response.status === 201,
                message: response.data.message,
                resetToken: response.data.resetToken
            };
        } catch (error: any) {
            console.error('Error al verificar código:', error.response?.data);
            throw {
                status: false,
                message: error.response?.data?.message || 'Error al verificar el código'
            };
        }
    },

    // Cambiar contraseña
    resetPassword: async (token: string, newPassword: string): Promise<VerifyCodeResponse> => {
        try {
            const response = await axios.post('auth/reset-password', {
                token,
                newPassword
            });
            
            return {
                status: response.status === 201,
                message: response.data.message
            };
        } catch (error: any) {
            console.error('Error al cambiar contraseña:', error.response?.data);
            throw {
                status: false,
                message: error.response?.data?.message || 'Error al cambiar la contraseña'
            };
        }
    }
}; 