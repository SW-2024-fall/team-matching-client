import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import Login from '@pages/login/Login';
import Register from '@pages/register/Register';
import Navigation from '@navigation/navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={MainScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </Navigation>
    </ThemeProvider>
  );
}
