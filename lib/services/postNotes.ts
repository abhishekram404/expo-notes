import { Note } from "../types/Note.type";
import { postNote } from "./postNote";

export const postNotes = async (variables: { notes: Note[] }) =>
  new Promise(async (resolve, reject) => {
    try {
      const unSyncedNotes = variables.notes
        .filter((note) => !note.is_synced)
        .map((note) => ({
          title: note.title,
          bodyText: note.bodyText,
          isPrimary: note.isPrimary,
          isPinned: note.isPinned,
          local_inserted_at: note.local_inserted_at,
          local_updated_at: note.local_updated_at,
        }));
      const promises = await Promise.all(unSyncedNotes.map(postNote));
      resolve(promises);
    } catch (error) {
      reject(error);
    }
  });
