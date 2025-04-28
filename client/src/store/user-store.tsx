import { create } from "zustand";
import { LoginUserRes } from "@/domain/dto/user";

type UserStore = {
  userDetails: LoginUserRes | null;
  setUserDetails: (user: LoginUserRes) => void;
  logout: () => void;
};

const initialState = {
  userDetails: JSON.parse(
    window.localStorage.getItem("userDetails") || "null"
  ) as LoginUserRes | null,
};

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  setUserDetails: (user) => {
    window.localStorage.setItem("userDetails", JSON.stringify(user));
    set({ userDetails: user });
  },
  logout: () => {
    window.localStorage.removeItem("userDetails");
    set({ userDetails: null });
  },
}));
