// 쿼리 키 팩토리
export const queryKeys = {
  // 이벤트 관련
  events: {
    all: ["events"] as const,
    lists: () => [...queryKeys.events.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.events.lists(), filters] as const,
    details: () => [...queryKeys.events.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.events.details(), id] as const,
  },

  // 사진 관련
  photos: {
    all: ["photos"] as const,
    lists: () => [...queryKeys.photos.all, "list"] as const,
    list: (filters: Record<string, unknown>) =>
      [...queryKeys.photos.lists(), filters] as const,
    details: () => [...queryKeys.photos.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.photos.details(), id] as const,
  },

  // 사용자 관련
  users: {
    all: ["users"] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
  },

  // 업로드 관련
  uploads: {
    all: ["uploads"] as const,
    progress: (id: string) =>
      [...queryKeys.uploads.all, "progress", id] as const,
  },
} as const;
