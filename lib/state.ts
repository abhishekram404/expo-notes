import { queryClient } from "@/app/_layout";
import { observable } from "@legendapp/state";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { persistPluginQuery } from "@legendapp/state/persist-plugins/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MutationFunction } from "@tanstack/react-query";
import { postNotes } from "./services/postNotes";
import { supabase } from "./supabase";
import { Note } from "./types/Note.type";

enableReactTracking({
  auto: true,
});

configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
});

export const state$ = observable<{
  notes: Partial<Note>[];
  user_id?: string | number | null;
}>({
  user_id: null,
  notes: [],
});

persistObservable(state$, {
  local: "d7ce6228c2a1c",
  remote: {
    transform: {
      in(value: any) {
        return {
          ...state$.get(),
          notes: value?.data || [],
        };
      },
    },
  },
  pluginRemote: persistPluginQuery({
    queryClient,
    query: {
      gcTime: 2000,
      queryKey: () => [state$.user_id.get()],
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      queryFn: () =>
        supabase
          .from("notes")
          .select()
          .eq("user_id", state$.user_id.get())
          .order("updated_at", {
            ascending: false,
          }),
    },
    mutation: {
      mutationFn: postNotes as MutationFunction<unknown>,
      onSuccess: async () => {
        state$.notes.set((prev) =>
          prev.map((note) => ({ ...note, is_synced: true }))
        );
      },
    },
  }),
});
