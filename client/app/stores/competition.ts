import { defineStore } from "pinia";
import type { Competition } from "../types/competition";

export const useCompetitionStore = defineStore("competition", {
  state: () => ({
    competitions: [] as Competition[],
    activeId: null as string | null,
  }),

  getters: {
    ongoingMatches: (state) =>
      state.competitions.filter((c) => c.status === "ongoing"),
    currentMatch: (state) =>
      state.competitions.find((c) => c.id === state.activeId),
  },

  actions: {
    addCompetition(newComp: Competition) {
      this.competitions.unshift(newComp);
    },
    updateStatus(id: string, status: Competition["status"]) {
      const comp = this.competitions.find((c) => c.id === id);
      if (comp) comp.status = status;
    },
  },
});
