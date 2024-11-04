import BaseHeader from './BaseHeader';
import { GoBackBtn, LogoBtn } from './Components';

export default function ProfileHeader({ isMe = false }) {
  return <BaseHeader left={isMe ? null : <GoBackBtn color={'white'} />} right={<LogoBtn />} />;
}
