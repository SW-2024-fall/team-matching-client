import { View } from "react-native";
import MeetingRecord from "./MeetingRecord";
import styled from "styled-components";

const MeetingHistoryResponse = {
    code: "SUCCESS",
    message: "string",
    data: [
        {
            id: 0,
            thumbnailUrl: "string",
            content: "오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.오늘 React Native 배웠어요.",
            writer: {
                id: "string",
                name: "홍길동",
                profileUrl: "string",
                attendenceScore: 0,
                major: "PUBLIC_ADMINISTRATION",
                studentId: "string",
                phoneNumber: "string",
                features: [
                    "string"
                ]
            },
            meetingId: 0,
            meetingName: "React Native 스터디"
        },
        {
            id: 1,
            thumbnailUrl: "string",
            content: "오늘 독서 모임 정말 좋았어요! 오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!오늘 독서 모임 정말 좋았어요!",
            writer: {
                id: "string",
                name: "최재원",
                profileUrl: "string",
                attendenceScore: 0,
                major: "PUBLIC_ADMINISTRATION",
                studentId: "string",
                phoneNumber: "string",
                features: [
                    "string"
                ]
            },
            meetingId: 0,
            meetingName: "독서 모임(이름 예시)"
        }
    ],
    page: {
        number: 0,
        size: 0,
        totalCount: 0,
        hasNext: true,
        hasPrevious: true
    }
}

const meetingHistoryData = MeetingHistoryResponse.data;

export default function MeetingRecordList() {
    return (
        <Container>
            <View>
                {meetingHistoryData.map((item) => (
                    <MeetingRecord
                        key={item.id}
                        name={item.writer.name}
                        group={item.meetingName}
                        content={item.content}
                        historyId={item.historyId}
                    />
                ))}
            </View>
        </Container>
    )
}

const Container = styled.View`
    margin:20px;
`;