import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PAGES } from '@navigation/constant';
import Login from '@pages/auth/login/Login';
import Register from '@pages/auth/register/Register';
import VerifyEmail from '@pages/auth/register/VerifyEmail';
import Withdraw from '@pages/auth/withdraw/Withdraw';
import Main from '@pages/main/Main';
import MeetingBoard from '@pages/meetingBoard/MeetingBoard';
import { Meeting } from '@pages/meeting/Meeting';
import { MeetingCreate } from '@pages/meeting/create/MeetingCreate';
import { MeetingHistory } from '@pages/meetingHistory/MeetingHistory';
import { MeetingHistoryCreate } from '@pages/meetingHistory/create/MeetingHistoryCreate';
import { MeetingFeed } from '@pages/meetingFeed/MeetingFeed';
import { Profile } from '@pages/profile/Profile';
import { ProfileEdit } from '@pages/profile/edit/ProfileEdit';
import { LikeHistory } from '@pages/profile/history/like/LikeHistory';
import { ScrapHistory } from '@pages/profile/history/scrap/ScrapHistory';
import { CommentHistory } from '@pages/profile/history/comment/CommentHistory';
import DefaultHeader from '@layout/header/DefaultHeader';
import MainHeader from '@layout/header/MainHeader';
import TitleHeader from '@layout/header/TitleHeader';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PAGES.LOGIN} component={Login} />
      <Stack.Screen name={PAGES.REGISTER} component={Register} />
      <Stack.Screen name={PAGES.VERIFY_EMAIL} component={VerifyEmail} />
      <Stack.Screen name={PAGES.WITHDRAW} component={Withdraw} />
    </Stack.Navigator>
  );
}

function MeetingStack({ params }) {
  return (
    <Stack.Navigator screenOptions={{ header: () => <TitleHeader title={params.title} /> }}>
      <Stack.Screen name={PAGES.MEETING} component={Meeting} />
      <Stack.Screen name={PAGES.MEETING_CREATE} component={MeetingCreate} />
    </Stack.Navigator>
  );
}

function MeetingHistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ header: DefaultHeader }}>
      <Stack.Screen name={PAGES.MEETING_HISTORY} component={MeetingHistory} />
      <Stack.Screen name={PAGES.MEETING_HISTORY_CREATE} component={MeetingHistoryCreate} />
    </Stack.Navigator>
  );
}

function MeetingFeedStack() {
  return (
    <Stack.Navigator screenOptions={{ header: DefaultHeader }}>
      <Stack.Screen name={PAGES.MEETING_FEED} component={MeetingFeed} />
    </Stack.Navigator>
  );
}

function ProfileStack({ params }) {
  return (
    <Stack.Navigator screenOptions={{ header: DefaultHeader }} initialRouteName={PAGES.PROFILE}>
      {/* params.access가 'me'일 때 header 없음 */}
      {params.access === 'me' ? (
        <Stack.Screen name={PAGES.PROFILE} component={Profile} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen
          name={PAGES.PROFILE}
          component={Profile}
          options={{ header: () => <TitleHeader title={params.name} /> }}
        />
      )}
      <Stack.Screen name={PAGES.PROFILE_EDIT} component={ProfileEdit} />
      <Stack.Screen name={PAGES.PROFILE_LIKE_HISTORY} component={LikeHistory} />
      <Stack.Screen name={PAGES.PROFILE_SCRAP_HISTORY} component={ScrapHistory} />
      <Stack.Screen name={PAGES.PROFILE_COMMENT_HISTORY} component={CommentHistory} />
    </Stack.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: DefaultHeader }} initialRouteName={PAGES.MAIN}>
        <Stack.Screen name={PAGES.AUTH} component={AuthStack} />
        <Stack.Screen name={PAGES.MAIN} component={Main} options={{ header: MainHeader }} />
        <Stack.Screen name={PAGES.MEETING_STACK} component={MeetingStack} />
        <Stack.Screen name={PAGES.MEETING_HISTORY_STACK} component={MeetingHistoryStack} />
        <Stack.Screen name={PAGES.MEETING_FEED_STACK} component={MeetingFeedStack} />
        <Stack.Screen name={PAGES.MEETING_BOARD} component={MeetingBoard} />
        <Stack.Screen name={PAGES.PROFILE_STACK} component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
