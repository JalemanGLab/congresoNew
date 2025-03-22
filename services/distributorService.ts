import axios from 'axios';

export interface Distributor {
    id: number;
    name: string;
    city: string;
    direction: string;
    is_active: boolean;
    created_at: string;
}

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: false
});

export const distributorService = {
    getDistributors: async (): Promise<Distributor[]> => {
        try {
            const response = await axiosInstance.get('/distributors');
            console.log('Respuesta del servidor:', response);
            return response.data;
        } catch (error: any) {
            console.error('Error detallado:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }
}; 