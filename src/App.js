import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '@navigation/navigation';
import { AuthProvider } from './pages/auth/AuthProvider';
import UserTokenProvider from './hooks/UserTokenProvider';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserTokenProvider>

          <Navigation />
        </UserTokenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
