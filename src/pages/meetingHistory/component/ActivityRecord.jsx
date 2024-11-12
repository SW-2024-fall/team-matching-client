
import { View, Text, Pressable, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"
import ActivityRecorder from "./ActivityRecorder"
import menu from '../../../assets/menu.svg';
import { WithLocalSvg } from "react-native-svg/css";
import { useState } from "react";

export default function ActivityRecord({ data }) {
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
    const onPressEdit = () => {
        //활동내역 수정 페이지 이동
    }
    const onPressDelete = async() => {
        try {
            const response = await fetch(`http://192.168.219.101:8080/api/histories/${historyId}`, { method: "DELETE" });
            if (!response.ok) { throw new Error("Failed to 히스토리 삭제"); }
        } catch (error) { console.error("Error 히스토리 삭제:", error); }
    }
    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
            <View>
                {data &&
                    <Container>

                        <Header><HeaderText>{data.title}</HeaderText></Header>
                        <Body><BodyText>{data.content}</BodyText></Body>
                        <ActivityRecorder name={data.writer.name} meetingName={data.meetingName}></ActivityRecorder>
                        <Footer>
                            {!menuVisible && <Pressable onPress={handlePress}>
                                <WithLocalSvg asset={menu} />
                            </Pressable>}
                            {menuVisible && (
                                <MenuContainer>
                                    <Pressable onPress={onPressDelete}>
                                        <MenuText>삭제</MenuText>
                                    </Pressable>
                                    <Line></Line>
                                    <Pressable onPress={onPressEdit}>
                                        <MenuText>수정</MenuText>
                                    </Pressable>
                                </MenuContainer>
                            )}
                        </Footer>
                    </Container>
                }
            </View>
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
const Container = styled.View`
    margin:20px;
`;
const Header = styled.View``;
const HeaderText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.bold};
    fontSize:${(props) => props.theme.font.size.large};
    color:${(props) => props.theme.font.color.primary};
`;
const Body = styled.View``;
const BodyText = styled.Text`
    fontWeight:${(props) => props.theme.font.weight.medium};
    fontSize:${(props) => props.theme.font.size.primary};
    color:${(props) => props.theme.font.color.primary};`;
const Footer = styled.View`
    flexDirection:row;
    justifyContent:flex-end;
`;