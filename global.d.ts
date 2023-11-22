import { Database } from "./lib/database.types";

export interface Timezone {
  value: string;

  text: string;
}

declare const timezones: Timezone[];

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

declare global {
  timezones, Profiles;
}
