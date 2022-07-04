import create from "zustand";
import { persist } from "zustand/middleware";

type State = {
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
};

export const useStore = create(
  persist<State>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "isloggedin-storage", // name of item in the storage (must be unique)
    }
  )
);

// export const useStore = create<State>((set) => ({
//   isLoggedIn: true,
//   logout: () => set({ isLoggedIn: false }),
//   login: () => set({ isLoggedIn: true }),
// }));
