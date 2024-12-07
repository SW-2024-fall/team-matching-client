import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PAGES } from '@navigation/constant';
import Login from '@pages/auth/login/Login';
import Register from '@pages/auth/register/Register';
import VerifyEmail from '@pages/auth/register/VerifyEmail';
import Withdraw from '@pages/auth/withdraw/Withdraw';
import Main from '../pages/main/Main.jsx';
import MeetingBoard from '@pages/meetingBoard/MeetingBoard';
import Meeting from '@pages/meeting/Meeting';
import MeetingCreate from '../pages/meeting/create/MeetingCreate';
import MeetingHistory from '@pages/meetingHistory/MeetingHistory';
import MeetingHistoryCreate from '../pages/meetingHistory/create/MeetingHistoryCreate';
import { MeetingFeed } from '@pages/meetingFeed/MeetingFeed';

import ProfileEdit from '../pages/profile/edit/ProfileEdit';
import { LikeHistory } from '@pages/profile/history/like/LikeHistory';
import { ScrapHistory } from '@pages/profile/history/scrap/ScrapHistory';
import { CommentHistory } from '@pages/profile/history/comment/CommentHistory';
import DefaultHeader from '@layout/header/DefaultHeader';
import MainHeader from '@layout/header/MainHeader';
import TitleHeader from '@layout/header/TitleHeader';
import { useAuth } from '../pages/auth/AuthProvider';
import MyProfile from '../pages/profile/MyProfile.jsx';
import Recommend from '../pages/recommend/Recommend.jsx';
import MeetingEdit from '../pages/meeting/edit/MeetingEdit.jsx';
import Profile from '../pages/profile/Profile.jsx';
const Stack = createNativeStackNavigator();

const AuthGuard = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return children;
};

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
