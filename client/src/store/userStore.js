import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user, token) =>
        set({
          user,
          token,
        }),

      clearUser: () => {
        localStorage.removeItem("user-storage");
        set({ user: null, token: null });
      },

      updateUser: (updatedFields) =>
        set((state) => ({
          user: { ...state.user, ...updatedFields },
        })),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useUserStore;
