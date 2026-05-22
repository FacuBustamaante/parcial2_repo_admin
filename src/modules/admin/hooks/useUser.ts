import { useQuery } from "@tanstack/react-query";
import { listUsuarios } from "../service/admin.service";

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["usuarios", page],
    queryFn: () => listUsuarios(page),
  });
};