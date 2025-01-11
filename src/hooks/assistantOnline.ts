import { create } from 'zustand'

const useAssisOnlineStore = create((set) => ({
    onlineId: -1,
    setOnline: (id: number) => set({ onlineId: id }),
    setOffline: () => set({ onlineId: -1 })
}))

export default useAssisOnlineStore