import { View, Text, Pressable, Button } from "react-native";
import styled from "styled-components";
import profile1 from '../../../../assets/profileExample1.svg';
import { WithLocalSvg } from "react-native-svg/css";
import menu from '../../../../assets/menu.svg';
import runningPhoto from '../../../../assets/runningPhoto.svg';
import useModal from "../../../../hooks/useModal";

export default function MeetingRecord({ name, group, content }) {
    const previewText = content.length > 100 ? `${content.substring(0, 100)}...` : content;
    const { Modal, open, close } = useModal();
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
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ marginBottom: 10 }}>삭제하시겠습니까?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable onPress={close} style={{ padding: 10, backgroundColor: 'lightgrey', marginRight: 10, borderRadius: 5 }}>
                                <Text>OK</Text>
                            </Pressable>
                            <Pressable onPress={close} style={{ padding: 10, backgroundColor: 'lightgrey', borderRadius: 5 }}>
                                <Text>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Header>
            <PhotoWrapper>
                <WithLocalSvg asset={runningPhoto} />
            </PhotoWrapper>

            <Content numberOfLines={3}>{previewText}</Content>
        </Container>
    )
}

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