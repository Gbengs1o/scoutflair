import { create } from "zustand";

export type tGlobalData = {
  shouldRefreshPosts: boolean;
  refreshPosts: () => void;
};

export const useGlobalData = create<tGlobalData>((set, get) => ({
  shouldRefreshPosts: false,
  refreshPosts: () => {
    set({
      shouldRefreshPosts: !get().shouldRefreshPosts,
    });
  },
}));
