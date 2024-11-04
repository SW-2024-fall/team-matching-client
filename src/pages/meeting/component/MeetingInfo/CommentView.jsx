import { View, Text, FlatList, TextInput,Dimensions } from "react-native";
import styled from "styled-components/native";
import { WithLocalSvg } from 'react-native-svg/css';
import profile1 from '../../../../assets/profileExample1.svg';
import profile2 from '../../../../assets/profileExample2.svg';
import CommentItem from "./CommentItem";
import { greyBlueColors } from "../../../../styles/ThemeStyles";

const screenWidth = Dimensions.get('window').width;

export default function CommentView({ comments }) {
  const count = comments.length;
  return (
    <Container>
      <Header>
        <HeaderText1>댓글 {count}</HeaderText1>
        <HeaderText2>모임에 대해 궁금한 점을 댓글로 남겨주세요!</HeaderText2>
      </Header>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>

  );
};

const Container = styled.View`
  margin:20px;
`;
const Header = styled.View`
  marginBottom:10px;
`;
const HeaderText1 = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.semiBold};
  fontSize:${(props) => props.theme.font.size.primary};
  color:${(props) => props.theme.font.color.primary};
`;
const HeaderText2 = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.regular};
  fontSize:${(props) => props.theme.font.size.small};
  color:${(props) => props.theme.font.color.primary};
`;

