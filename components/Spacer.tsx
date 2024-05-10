import React from "react";
import { View } from "react-native";

export default function Spacer({ size = 2 }: { size?: number }) {
  return <View style={{ marginVertical: size }}></View>;
}
