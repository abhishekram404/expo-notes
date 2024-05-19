import { supabase } from "../supabase";

export const fetchNotes = async (userId: string | number) => {
  return supabase
    .from("notes")
    .select()
    .eq("user_id", userId)
    .order("updated_at", {
      ascending: false,
    });
};
