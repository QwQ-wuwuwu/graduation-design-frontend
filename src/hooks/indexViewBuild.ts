import { create } from 'zustand'

const useIndexViewBuildStore = create((set) => ({
    build: false,
    setBuild: () => set({ build: true }),
    setUnBuild: () => set({ build: false })
}))

export default useIndexViewBuildStore