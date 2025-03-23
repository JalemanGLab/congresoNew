import { toast } from "sonner";
import axiosInstance from "./config/axios";

export interface Distributor {
  id: number;
  name: string;
  city: string;
  direction: string;
  is_active: boolean;
  created_at: string;
}

export const distributorService = {
  getDistributors: async (): Promise<Distributor[]> => {
    try {
      const response = await axiosInstance.get("/distributors");
      return response.data;
    } catch (error: any) {
      toast.error(error.message)
      throw error;
    }
  },
};
