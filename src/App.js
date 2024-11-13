import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '@navigation/navigation';
import ProfileEdit from './pages/profile/edit/ProfileEdit';
import MeetingBoard from './pages/meetingBoard/MeetingBoard';
import MeetingCreate from './pages/meeting/create/MeetingCreate';
import MeetingHistoryCreate from './pages/meetingHistory/create/MeetingHistoryCreate';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Navigation /> */}
      <MeetingHistoryCreate />
    </ThemeProvider>
  );
}