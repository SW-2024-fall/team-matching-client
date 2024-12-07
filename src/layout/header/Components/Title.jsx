import styled from 'styled-components/native';
import { theme } from '@styles/ThemeStyles';

export default function Title({ title, color = theme.colors.grey.primary }) {
  const TitleWrapper = styled.Text`
    color: ${color};
    font-size: ${(props) => props.theme.font.size.large};
    font-weight: ${(props) => props.theme.font.weight.bold};
    max-width: calc(100% - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  return <TitleWrapper>{title}</TitleWrapper>;
}
