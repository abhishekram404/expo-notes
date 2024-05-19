import { Credentials } from "@/app/(app)/(stack)/auth";
import { Alert } from "react-native";

export const validateCreds = (creds: Credentials) => {
  if (!creds?.email?.trim()) {
    Alert.alert("Invalid credentials", "An email is required.");
    return false;
  }

  if (!creds?.password?.trim()) {
    Alert.alert("Invalid credentials", "A password is required.");
    return false;
  }

  return true;
};
