import { Platform } from "react-native";

export const showOnAndroid = (fn: Function) => {
  if (Platform.OS === "android") {
    fn();
  }
};
