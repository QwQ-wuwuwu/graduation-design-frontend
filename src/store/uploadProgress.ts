import { create } from "zustand";

export const useUploadProgressStore = create(set => ({
    progress: 0,
    setProgress: (process:number) => set({ process })
}))