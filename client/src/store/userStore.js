import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null, // user data (after login/register)
      token: null, // optional auth token

      // ✅ set user and token
      setUser: (user, token) => set({ user, token }),

      // ✅ clear user data (logout)
      clearUser: () => set({ user: null, token: null }),

      // ✅ update user fields without overwriting everything
      updateUser: (updatedFields) =>
        set((state) => ({
          user: { ...state.user, ...updatedFields },
        })),
    }),
    {
      name: "user-storage", // storage key
      getStorage: () => localStorage, // default is localStorage
    }
  )
);

export default useUserStore;
