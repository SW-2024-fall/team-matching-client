import { PAGES } from '@navigation/constant';
import MyProfile from './MyProfile';
import PublicProfile from './PublicProfile';

export default function Profile({ route }) {
  const screen = route.name;
  const isMe = screen === PAGES.MYPROFILE;

  return isMe ? <MyProfile /> : <PublicProfile />;
}
