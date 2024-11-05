import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PAGES } from '@navigation/constant';
import {
  Login,
  Register,
  VerifyEmail,
  Main,
  Meeting,
  MeetingCreate,
  MeetingBoard,
  MeetingHistory,
  MeetingHistoryCreate,
  Profile,
  ProfileEdit,
  Recommend,
} from '@pages';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={PAGES.MAIN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={PAGES.LOGIN} component={Login} />
        <Stack.Screen name={PAGES.REGISTER} component={Register} />
        <Stack.Screen name={PAGES.VERIFY_EMAIL} component={VerifyEmail} />
        <Stack.Screen name={PAGES.MAIN} component={Main} />
        <Stack.Screen name={PAGES.MEETING} component={Meeting} />
        <Stack.Screen name={PAGES.MEETING_CREATE} component={MeetingCreate} />
        <Stack.Screen name={PAGES.MEETING_HISTORY} component={MeetingHistory} />
        <Stack.Screen name={PAGES.MEETING_HISTORY_CREATE} component={MeetingHistoryCreate} />
        <Stack.Screen name={PAGES.MEETING_BOARD} component={MeetingBoard} />
        <Stack.Screen name={PAGES.MYPROFILE}>
          {(props) => <Profile {...props} isMe={true} />}
        </Stack.Screen>
        <Stack.Screen name={PAGES.PROFILE} component={Profile} />
        <Stack.Screen name={PAGES.PROFILE_EDIT} component={ProfileEdit} />
        <Stack.Screen name={PAGES.RECOMMEND} component={Recommend} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
