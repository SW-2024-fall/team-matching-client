import { ActivityIndicator, View,Text } from "react-native";
import MeetingRecord from "./MeetingRecord";
import styled from "styled-components";
import { useEffect, useState } from "react";
import UserTokenContext from '../../../../hooks/UserTokenContext';
import { useContext } from 'react'

export default function MeetingRecordList({id}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {userToken, setUserToken} = useContext(UserTokenContext);

    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/${id}/histories?page=0&size=1&sort=asc`, { 
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${userToken}`
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
        return <ActivityIndicator size="large" color="#000000" />; // 로딩 중일 때 인디케이터 표시
    }

    if (error) {
        return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
    }
    return (
        <Container>
            <View>
                {data.map((item) => (
                    <MeetingRecord
                        key={item.id}
                        name={item.writer.name}
                        uri={item.writer.profileUrl}
                        group={item.meetingName}
                        content={item.content}
                        historyId={item.id}
                        thumbnailUrl={item.thumbnailUrl}
                    />
                ))}
            </View>
        </Container>
    )
}

const Container = styled.View`
    margin:20px;
`;