import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PAGES } from '@navigation/constant';
import Login from '@pages/auth/login/Login';
import Register from '@pages/auth/register/Register';
import VerifyEmail from '@pages/auth/register/VerifyEmail';
import Main from '../pages/main/Main.jsx';
import MeetingBoard from '../pages/meetingBoard/MeetingBoard';
import Meeting from '../pages/meeting/Meeting';
import MeetingCreate from '../pages/meeting/create/MeetingCreate';
import MeetingHistory from '../pages/meetingHistory/MeetingHistory';
import MeetingEdit from '../pages/meeting/edit/MeetingEdit';
import MeetingHistoryCreate from '../pages/meetingHistory/create/MeetingHistoryCreate';
import MyProfile from '../pages/profile/MyProfile';
import ProfileEdit from '../pages/profile/edit/ProfileEdit';
import Recommend from '../pages/recommend/Recommend.jsx';
import Profile from '../pages/profile/Profile.jsx';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={PAGES.LOGIN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={PAGES.LOGIN} component={Login} />
        <Stack.Screen name={PAGES.REGISTER} component={Register} />
        <Stack.Screen name={PAGES.VERIFY_EMAIL} component={VerifyEmail} />
        <Stack.Screen name={PAGES.MAIN} component={Main} />
        <Stack.Screen name={PAGES.MEETING} component={Meeting} />
        <Stack.Screen name={PAGES.MEETING_CREATE} component={MeetingCreate} />
        <Stack.Screen name={PAGES.MEETING_EDIT} component={MeetingEdit} />
        <Stack.Screen name={PAGES.MEETING_HISTORY} component={MeetingHistory} />
        <Stack.Screen name={PAGES.MEETING_HISTORY_CREATE} component={MeetingHistoryCreate} />
        <Stack.Screen name={PAGES.MEETING_BOARD} component={MeetingBoard} />
        <Stack.Screen name={PAGES.MYPROFILE} component={MyProfile} />
        <Stack.Screen name={PAGES.PROFILE} component={Profile} />
        <Stack.Screen name={PAGES.PROFILE_EDIT} component={ProfileEdit} />
        <Stack.Screen name={PAGES.RECOMMEND} component={Recommend} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
