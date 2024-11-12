import { View, Text, Pressable, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import profile1 from '../../../../assets/profileExample1.svg';
import { WithLocalSvg } from "react-native-svg/css";
import menu from '../../../../assets/menu.svg';
import runningPhoto from '../../../../assets/runningPhoto.svg';
import useModal from "../../../../hooks/useModal";
import { useState } from "react";

export default function MeetingRecord({ name, group, content, historyId }) {
    const previewText = content.length > 100 ? `${content.substring(0, 100)}...` : content;
    const { Modal, open, close } = useModal();
    
    const onPressDelete = async () => {
        try {
            const response = await fetch(`http://192.168.219.101:8080/api/histories/${historyId}`, { method: "DELETE" });
            if (!response.ok) { throw new Error("Failed to 히스토리 삭제"); }
        } catch (error) { console.error("Error 히스토리 삭제:", error); }
    };
    const onPressUpdate = async () => {
        //히스토리 수정 페이지 이동
    };
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const handlePress = (event) => {
        const { pageX, pageY } = event.nativeEvent;
        setMenuPosition({ x: pageX, y: pageY });
        setMenuVisible(!menuVisible);
    };
    const closeMenu = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
            <Container >


                <Header>
                    <HeaderLeft>
                        <WithLocalSvg asset={profile1} />
                        <HeaderNameContainer>
                            <Name>{name}</Name>
                            <MeetingName >{group}</MeetingName>
                        </HeaderNameContainer>
                    </HeaderLeft>
                    {!menuVisible && <Pressable onPress={handlePress}>
                        <WithLocalSvg asset={menu} />
                    </Pressable>}

                    {menuVisible && (
                        <MenuContainer>
                            <Pressable onPress={onPressDelete}>
                                <MenuText>삭제</MenuText>
                            </Pressable>
                            <Line></Line>
                            <Pressable onPress={onPressUpdate}>
                                <MenuText>수정</MenuText>
                            </Pressable>
                        </MenuContainer>
                    )}
                    {/* <Modal>
                    <ModalView>
                        <Pressable onPress={onPressDelete}>
                            <Text>삭제</Text>
                        </Pressable>
                        <Line></Line>
                        <Pressable onPress={onPressUpdate}>
                            <Text>수정</Text>
                        </Pressable>
                    </ModalView>
                </Modal> */}
                </Header>
                <PhotoWrapper>
                    <WithLocalSvg asset={runningPhoto} />
                </PhotoWrapper>

                <Content numberOfLines={3}>{previewText}</Content>
            </Container>
        </TouchableWithoutFeedback>
    )
}
const Line = styled.View`
  borderBottomWidth:1px;
  width:100%;
`;
const MenuContainer = styled.View`
    border:1px;
    borderRadius:8px;
    width:55px;
    height:40px;
    justifyContent:center;
    alignItems:center;
    paddingTop:3px;
    paddingBottom:3px;
`;
const MenuText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.regular};
    fontSize:${(props) => props.theme.font.size.small};
    color:${(props) => props.theme.font.color.primary};
    
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