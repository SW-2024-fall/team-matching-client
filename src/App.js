import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUpPage from "./pages/auth/SignUpPage";
import PortalAuthPage from "./pages/auth/PortalAuthPage";

export default function App() {
  return (
      <SignUpPage></SignUpPage>
    // <PortalAuthPage></PortalAuthPage>
  );
}


