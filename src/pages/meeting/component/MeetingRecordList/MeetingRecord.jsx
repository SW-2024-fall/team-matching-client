import { View, Text, Pressable } from "react-native";
import styled from "styled-components";
import profile1 from '../../../../assets/profileExample1.svg';
import { WithLocalSvg } from "react-native-svg/css";
import menu from '../../../../assets/menu.svg';
import runningPhoto from '../../../../assets/runningPhoto.svg';
import useModal from "../../../../hooks/useModal";

export default function MeetingRecord({ name, group, content, historyId }) {
    const previewText = content.length > 100 ? `${content.substring(0, 100)}...` : content;
    const { Modal, open, close } = useModal();
    const onPressDelete = async () => {
        const url = `/api/histories/${historyId}`;
        const data = {
            targetUserId: { userId }
        };
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const responseBody = await response.json();
                console.log("응답 데이터:", responseBody);
            } else {
                console.error("요청 실패:", response.status);
            }
        } catch (error) {
            console.error("네트워크 오류:", error);
        }
    };
    const onPressUpdate = async () => {
        //히스토리 수정 페이지 이동
    };
    return (
        <Container >
            <Header>
                <HeaderLeft>
                    <WithLocalSvg asset={profile1} />
                    <HeaderNameContainer>
                        <Name>{name}</Name>
                        <MeetingName >{group}</MeetingName>
                    </HeaderNameContainer>
                </HeaderLeft>
                <Pressable onPress={open}>
                    <WithLocalSvg asset={menu} />
                </Pressable>
                <Modal>
                    <ModalView>
                        <Pressable onPress={onPressDelete}>
                            <Text>삭제</Text>
                        </Pressable>
                        <Line></Line>
                        <Pressable onPress={onPressUpdate}>
                            <Text>수정</Text>
                        </Pressable>
                    </ModalView>
                </Modal>
            </Header>
            <PhotoWrapper>
                <WithLocalSvg asset={runningPhoto} />
            </PhotoWrapper>

            <Content numberOfLines={3}>{previewText}</Content>
        </Container>
    )
}
const Line = styled.View`
  borderBottomWidth:1px;
  width:100%;
`;
const ModalView = styled.View`
    position:relative;

    width:60px;
    height:40px;
    justifyConent:center;
    alignItems:center;
`;
const Container = styled.View``;
const Header = styled.View`
    flexDirection:row;
    justifyContent:space-between;
    alignItems:center;
    marginBottom:5px;
    marginTop:5px;
`;
const HeaderLeft = styled.View`
    flexDirection:row;
    alignItems:center;
    
`;
const PhotoWrapper = styled.View`
    borderRadius:12px;
    overflow:hidden;
`;
const HeaderNameContainer = styled.View`
    marginLeft:3px;
`;
const Name = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.semiBold};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};
`;
const MeetingName = styled.Text`
  fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.xSmall};
  color:${(props) => props.theme.font.color.primary};`;
const Body = styled.View``;
const Content = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.medium};
  fontSize:${(props) => props.theme.font.size.primary};
  color:${(props) => props.theme.font.color.primary};
`;