import { supabase } from "../supabase";

export const postNote = async (note: unknown) =>
  supabase.from("notes").insert(note);
