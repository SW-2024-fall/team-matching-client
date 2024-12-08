import BaseHeader from './BaseHeader';
import { GoBackBtn, LogoBtn } from './Components';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthProvider';

export default function ProfileHeader() {
  const route = useRoute();
  const { id } = route.params;
  const { user } = useAuth();

  if (user?.id == id) {
    isMe = true;
  }

  return <BaseHeader left={ <GoBackBtn />} right={<LogoBtn />} />;
}
