import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";

function CommentItem({ comment }) {
  return (
    <View>
      <Text >
        {comment.name} | {comment.department} | {comment.studentId}
      </Text>
      <Text >{comment.text}</Text>

      {/* 대댓글이 있을 경우 대댓글 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <FlatList
          data={comment.replies}
          renderItem={({ item }) => <CommentItem comment={item} />}
          keyExtractor={(item, index) => index.toString()}

        />
      )}
    </View>
  );
};

// 댓글 뷰 컴포넌트
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
