import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';

export default function Main({ navigation }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch("http://10.0.73.4:8080/api/meetings",{method:"GET"});
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const json = await response.json(); 
            setData(json);
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
        return <Text>Error: {error}</Text>; // 에러 메시지 표시
    }
    return (
        <Layout screen={PAGES.MAIN} navigation={navigation}>
        <View>
            <Text>Home Screen</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(PAGES.MEETING_BOARD)}>
            <Text>Let's go meeting board</Text>
        </Pressable>
        {data.data.map((item, index)=>(
            <Pressable onPress={() => navigation.navigate(PAGES.MEETING, { id: item.id, title: item.name })}>
            <Text>{item.name}</Text>
            </Pressable>
        ))}
        </Layout>
    );
    }
