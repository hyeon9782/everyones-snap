import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./types";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userIdx");
        set({ user: null });
      },
    }),
    {
      name: "user-storage", // localStorage에 저장될 키 이름
    }
  )
);
