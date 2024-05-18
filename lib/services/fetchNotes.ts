import { supabase } from "../supabase";

export const fetchNotes = async () =>
  supabase.from("notes").select().order("updated_at", {
    ascending: false,
  });
