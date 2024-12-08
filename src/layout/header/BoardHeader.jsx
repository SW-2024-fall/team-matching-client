import BaseHeader from './BaseHeader';
import { GoBackBtn, Title } from './Components';
import { theme } from '@styles/ThemeStyles';

export default function BoardHeader({ FilterComponent }) {
  return (
    <BaseHeader
      left={<GoBackBtn color={'white'} />}
      center={<Title title={'모임 모집 게시판'} color={'white'} />}
      right={FilterComponent && <FilterComponent />}
      backgroundColor={theme.colors.blue.primary}
    />
  );
}
