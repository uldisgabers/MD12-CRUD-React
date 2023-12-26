import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: () => {
      return axios.get("http://localhost:3001/cars").then(({ data }) => {
        return data.cars;
      });
    },
    staleTime: Infinity,
  });
}
