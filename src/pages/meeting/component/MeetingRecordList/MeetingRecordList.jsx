import { ActivityIndicator, View,Text } from "react-native";
import MeetingRecord from "./MeetingRecord";
import styled from "styled-components";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedPost from "../../../main/components/FeedPost";
import { useNavigation } from "@react-navigation/native";

export default function MeetingRecordList({id, userRole}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/histories?page=0&size=1&sort=asc`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setData(json.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#444444"   style={{marginTop:100}}/>; // 로딩 중일 때 인디케이터 표시
    }

    if (error) {
        return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
    }
    return (
        <Container>
            {data.map((item) => (
                    // id, name, title, profileUrl, thumbnailUrl, preview , navigation, userRole="MEMBER"
                    <FeedPost
                        id={item.id}
                        name={item.writer.name}
                        profileUrl={item.writer.profileUrl}
                        title={item.meetingName}
                        preview={item.content}
                        thumbnailUrl={item.thumbnailUrl}
                    userRole={userRole}
                    navigation={navigation}
                    />
                ))}
        </Container>
    )
}

const Container = styled.View`
    gap: 10px;
`;