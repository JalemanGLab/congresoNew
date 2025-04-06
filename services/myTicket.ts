import axiosInstance from "./config/axios";

export const myTicketService = async (identification: string) => {
  try {
    const response = await axiosInstance.get(`/assistants/ticket/${identification}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

