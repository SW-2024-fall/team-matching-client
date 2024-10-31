import { Text, View, FlatList, } from "react-native";
import MeetingRecord from "./MeetingRecord";
import styled from "styled-components";

const data = [
    { id: '1', name: '홍길동', group: '독서 모임', content: '오늘 독서 모임 정말 좋았어요! 오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!' },
    { id: '2', name: '최재원', group: '개발 모임', content: '오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.' },
    { id: '3', name: '권민재', group: '운동 모임', content: '축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.축구 모임에서 많은 친구를 만났어요.' },
];

export default function MeetingRecordList() {
    return (
        <Container>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MeetingRecord name={item.name} group={item.group} content={item.content} />
                )}
            />
        </Container>
    )
}

const Container = styled.View`
    margin:20px;
`;