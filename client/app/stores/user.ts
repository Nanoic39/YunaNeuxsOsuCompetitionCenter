// app/stores/user.ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    nickname: "开发者",
    points: 100,
  }),
  actions: {
    updateNickname(newName: string) {
      this.nickname = newName;
    },
  },
});
