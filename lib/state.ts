import { CardProps } from "@/components/Card";
import { observable } from "@legendapp/state";
import {
    configureObservablePersistence,
    persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
});
