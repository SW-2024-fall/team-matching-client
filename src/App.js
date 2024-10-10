import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image} from "react-native";
import { SafeAreaView } from 'react-native';
import CreateMeetingScreen from './pages/CreateMeetingScreen';
import ActivityDetailScreen from './pages/ActivityDetaliScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityDetailScreen />
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
