import { theme } from './styles/ThemeStyles';
import { ThemeProvider } from 'styled-components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import Login from '@pages/login/Login';//구현된 페이지에서 가져오기
import Register from '@pages/register/Register';//구현된 페이지에서 가져오기
import Navigation from '@navigation/navigation';
import { UserProvider } from './context/userContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Navigation>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={MainScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </Navigation>
      </UserProvider>
    </ThemeProvider>
  );
}
