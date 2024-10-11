import { View,Text, FlatList } from "react-native";

function CommentItem({comment}){
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
  export default function CommentView ({ comments }){
    return (
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  
