import axiosInstance, { handleAxiosError } from './axios';


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
  }
