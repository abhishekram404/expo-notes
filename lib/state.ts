import { CardProps } from "@/components/Card";
import { observable } from "@legendapp/state";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { persistPluginQuery } from "@legendapp/state/persist-plugins/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "./services/fetchNotes";

const queryClient = new QueryClient();

configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
});

export const state$ = observable<{ notes: Partial<CardProps>[] }>({
  notes: [],
});

persistObservable(state$, {
  local: "d7ce6228c2a1c",
  remote: {
    transform: {
      in(value: any) {
        return {
          notes: value?.data,
        };
      },
    },
  },
  pluginRemote: persistPluginQuery({
    queryClient,
    query: {
      queryKey: () => ["all-notes"],
      queryFn: fetchNotes,
    },
  }),
});
