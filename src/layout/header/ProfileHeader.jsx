import BaseHeader from './BaseHeader';
import { GoBackBtn, LogoBtn } from './Components';

export default function ProfileHeader() {
  return <BaseHeader left={ <GoBackBtn />} right={<LogoBtn />} />;
}
