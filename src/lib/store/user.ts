import { create } from 'zustand'

interface UserState {
user: UserType | undefined;
onlineUsersCount: number;
  setOnlineUsersCount: (count: number) => void;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
  onlineUsersCount: 0,
  setOnlineUsersCount: (count) => set({ onlineUsersCount: count }),
}))
