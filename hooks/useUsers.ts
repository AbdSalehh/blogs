import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await api.get("/users");
        return response.data.data;
      } catch (error: any) {
        throw error;
      }
    },
    staleTime: Infinity,
  });
};
