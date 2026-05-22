import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserRoles } from "../service/admin.service";

import type { UserRole } from "../types/roles.constant";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      roles,
    }: {
      id: number;
      roles: UserRole[];
    }) =>
      updateUserRoles(id, roles),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuarios"],
      });
    },
  });
};