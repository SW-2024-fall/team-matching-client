import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { WithLocalSvg } from 'react-native-svg/css';
import profile1 from '../../../../assets/profileExample1.svg';
import profile2 from '../../../../assets/profileExample2.svg';
import curveArrow from '../../../../assets/curveArrow.svg';

export default function CommentItem({ comment }) {
    return (
        <Container>
            <Header>
                <WithLocalSvg
                    asset={profile1} />
                <HeaderRight>
                    <HeaderText>{comment.name}</HeaderText>
                    <HeaderText>{comment.department}  {comment.studentId}</HeaderText>
                </HeaderRight>
            </Header>
            <Body>
                <BodyText >{comment.text}</BodyText>
            </Body>
            <FooterText>24.04.30 09:33</FooterText>
            <SubBody>

                {/* 대댓글이 있을 경우 대댓글 렌더링 */}
                {comment.replies && comment.replies.length > 0 && (
                    <SubBodyWrapper>
                        <WithLocalSvg
                            asset={curveArrow} />
                        <ScrollView>
                            <View>
                                {comment.replies.map((item, index) => (
                                    <CommentItem key={index.toString()} comment={item} />
                                ))}
                            </View>
                        </ScrollView>
                    </SubBodyWrapper>

                )}
            </SubBody>
            {comment.replies && comment.replies.length > 0 && <Line></Line>}
        </Container>
    );
};

const Container = styled.View`
  marginTop:5px;
`;
const Header = styled.View`
    flexDirection:row;
`;
const HeaderRight = styled.View`
    flexDirection:column;
`;
const HeaderText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
`;
const Body = styled.View`
    marginTop:5px;
    marginBottom:5px;
`;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
`;
const FooterText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.xSmall};
    color:${(props) => props.theme.font.color.light};
`;
const SubBody = styled.Text`
    marginLeft:20px;
`;
const SubBodyWrapper = styled.View`
    flexDirection:row;
`;
const Line = styled.View`
  borderBottomWidth:1px;
  width:90%;
  marginBottom:10px;
`;