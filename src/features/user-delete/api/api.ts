import { httpClient } from "@/shared/api/base-client";
import { useMutation } from "@tanstack/react-query";

export const deleteUser = async ({ userIdx }: { userIdx: number }) => {
  return httpClient
    .delete(`/v1/users/${userIdx}`)
    .then((res) => (res.data as any).data);
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
