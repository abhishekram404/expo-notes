import React from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from "./CheckBox";

const CheckList = () => {
  return (
    <View style={styles.container}>
      <CheckBox label="Wake up 5am" checked />
      <CheckBox label="Morning run" />
      <CheckBox label="Buy Coffee" />
      <CheckBox label="Meeting" checked />
    </View>
  );
};

export default CheckList;

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
});
