import axiosInstance, { handleAxiosError } from '@/services/config/axios';

export const registerAssistant = async (data: any) => {
    try {
      const response = await axiosInstance.post('/assistants', data);
      return response.data;
    } catch (error) {
      const errorResponse = handleAxiosError(error);
      throw errorResponse;
    }
  };

export const getDistributors = async () => {
    try {
        const response = await axiosInstance.get('/distributors');
        return response.data;
    } catch (error) {
        const errorResponse = handleAxiosError(error);
        throw errorResponse;
    }
};

export const registerQr = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/assistants/register-entry/${id}`, {});
    return response.data;
  } catch (error) {
    const errorInfo = handleAxiosError(error);
    return {
      success: false,
      message: errorInfo.message
    };
  }
};

export const getAssistants = async () => {
    try {
        const response = await axiosInstance.get(`/assistants`);
        return response.data;
    } catch (error) {
        const errorResponse = handleAxiosError(error);
        throw errorResponse;
    }
};

export const refreshTransaction = async (transaction_id: string) => {
  try {
    const response = await axiosInstance.get(`/payments/transaction/${transaction_id}`);
    return response;
  } catch (error) { 
    const errorResponse = handleAxiosError(error);
    throw errorResponse;
  }
};

