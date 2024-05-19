import { queryClient } from "@/app/_layout";
import { CardProps } from "@/components/Card";
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
import { fetchNotes } from "./services/fetchNotes";
import { postNotes } from "./services/postNotes";

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
  notes: Partial<CardProps>[];
  user_id?: string | number | null;
}>({
  user_id: null,
  notes: [],
});

const _state = persistObservable(state$, {
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
      queryFn: () => fetchNotes(state$.user_id.get()),
    },
    mutation: {
      mutationFn: postNotes as MutationFunction<unknown>,
    },
  }),
});
