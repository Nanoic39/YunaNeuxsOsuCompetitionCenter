export type OsuMode = "osu" | "taiko" | "fruits" | "mania";
export type CompetitionStatus =
  | "registration"
  | "qualifiers"
  | "ongoing"
  | "finished";

export interface Player {
  id: number;
  username: string;
  avatar_url: string;
  rank: number;
  status: "pending" | "approved" | "rejected";
}

export interface Competition {
  id: string;
  title: string;
  mode: OsuMode;
  status: CompetitionStatus;
  maxPlayers: number;
  description: string;
  startTime: string;
  registeredPlayers: Player[];
  // 扩展字段
  mappoolId?: string;
  bannerUrl?: string;
}
