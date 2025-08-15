import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GuestResponse } from "./types";

type GuestRegistStore = {
  guest: GuestResponse | null;
  setGuest: (guest: GuestResponse | null) => void;
};

export const useGuestRegistStore = create<GuestRegistStore>()(
  persist(
    (set) => ({
      guest: null,
      setGuest: (guest) => set({ guest }),
    }),
    {
      name: "guest-regist-storage", // localStorage 키 이름
      // storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용하려면 이 줄 추가
    }
  )
);
