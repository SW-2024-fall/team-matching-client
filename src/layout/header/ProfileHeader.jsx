import BaseHeader from './BaseHeader';
import { GoBackBtn, LogoBtn } from './Components';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';

export default function ProfileHeader({ isMe = false }) {
  const route = useRoute();
  const { id } = route.params;
  const { user } = useAuth();

  if (user?.id == id) {
    isMe = true;
  }

  return <BaseHeader left={ isMe ? <View /> : <GoBackBtn />} right={<LogoBtn />} />;
}
