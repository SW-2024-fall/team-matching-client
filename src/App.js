import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from '@navigation/navigation';
import { AuthProvider } from './pages/auth/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>

      <Navigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
