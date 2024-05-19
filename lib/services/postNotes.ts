import { showOnAndroid } from "@/utils/showOnAndroid";
import { ToastAndroid } from "react-native";
import { supabase } from "../supabase";
import { Note } from "../types/Note.type";
import { postNote } from "./postNote";

export const postNotes = async (variables: { notes: Note[] }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const unSyncedNotes = variables.notes
        .filter((note) => !note.is_synced)
        .map((note) => ({
          title: note.title,
          bodyText: note.bodyText,
          isPrimary: note.isPrimary,
          isPinned: note.isPinned,
          local_inserted_at: note.local_inserted_at,
          local_updated_at: note.local_updated_at,
          user_id: data.session.user.id,
        }));
      if (!unSyncedNotes.length) return;

      showOnAndroid(() =>
        ToastAndroid.show(
          `Syncing ${unSyncedNotes.length} notes`,
          ToastAndroid.SHORT
        )
      );
      const promises = await Promise.all(unSyncedNotes?.map(postNote));

      showOnAndroid(() =>
        ToastAndroid.show(
          `Successfully synced ${promises.length} notes`,
          ToastAndroid.SHORT
        )
      );
      resolve(promises);
    } catch (error) {
      reject(error);
    }
  });
