// useStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  activarUsuario,
  desactivarUsuario,
} from "../service/admin.service";

export const useDesactivarUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => desactivarUsuario(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
    },
  });
};

export const useActivarUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activarUsuario(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
    },
  });
};