<<<<<<< Updated upstream
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native';
import CreateMeetingScreen from './pages/CreateMeetingScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CreateMeetingScreen />
    </SafeAreaView>
=======
import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '@navigation/navigation';
import CreateMeetingScreen from './pages/CreateMeetingScreen';
import ActivityDetailScreen from './pages/ActivityDetaliScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
        // <ActivityDetailScreen />
        <CreateMeetingScreen />

    // <ThemeProvider theme={theme}>
    //   <Navigation />
    // </ThemeProvider>
>>>>>>> Stashed changes
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
