import { httpClient } from "@/shared/api/base-client";
import { useMutation } from "@tanstack/react-query";
import { GuestbookUpdateRequest, GuestbookWriteRequest } from "../model/types";

export const writeGuestbook = async (payload: GuestbookWriteRequest) => {
  return httpClient
    .post(`/v1/visitor-notes`, payload)
    .then((res) => (res.data as any).data);
};

export const updateGuestbook = async (
  visitorNoteIdx: number,
  payload: GuestbookUpdateRequest
) => {
  return httpClient
    .put(`/v1/visitor-notes/${visitorNoteIdx}`, payload)
    .then((res) => (res.data as any).data);
};

export const deleteGuestbook = async ({
  visitorNoteIdx,
}: {
  visitorNoteIdx: number;
}) => {
  return httpClient
    .delete(`/v1/visitor-notes/${visitorNoteIdx}`)
    .then((res) => (res.data as any).data);
};

export const useWriteGuestbookMutation = () => {
  return useMutation({
    mutationFn: writeGuestbook,
  });
};

export const useUpdateGuestbookMutation = () => {
  return useMutation({
    mutationFn: updateGuestbook,
  });
};

export const useDeleteGuestbookMutation = () => {
  return useMutation({
    mutationFn: deleteGuestbook,
  });
};
