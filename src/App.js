import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native';
import CreateMeetingScreen from './pages/CreateMeetingScreen';
import LoginScreen from './pages/auth/LoginPage';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <LoginScreen/> */}
      <CreateMeetingScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
