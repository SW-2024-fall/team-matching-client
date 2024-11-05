import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '@navigation/navigation';
import MeetingHistoryCreate from './pages/meetingHistory/create/MeetingHistoryCreate';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <MeetingHistoryCreate />
    </ThemeProvider>
  );
}
