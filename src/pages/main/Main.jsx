import React from 'react';
import { View, Text, StyleSheet, FlatList , Image, ScrollView} from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import { theme } from '@styles/ThemeStyles';
import StoryCircle from '@pages/main/components/StoryCircle';
import FeedPost from '@pages/main/components/FeedPost';
import { useEffect, useState } from 'react';



export default function Main({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch("http://10.0.84.8:8080/api/meetings",{method:"GET"});
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


    return (
        <Layout screen={PAGES.MAIN} navigation={navigation}>
            {/* Story Section */}
            <View style={styles.storyContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyList}>
                    {data.data.map((item) => (
                        <StoryCircle key={item.userId} imageUrl={item.imageUrl} userId={item.userId} />
                    ))}
                </ScrollView>
            </View>
            
            {/* Feed Section */}
            <View style={styles.feedPostContainer}>
                <ScrollView>
                    {data.data.map((item) => (
                        <FeedPost 
                            key={item.id}
                            name={item.name}
                            title={item.title}
                            profileUrl={item.profileUrl}
                            thumbnailUrl={item.thumbnailUrl}
                            preview={item.preview}
                        />
                    ))}
                </ScrollView>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.colors.background.primary,
    },
    storyContainer: {
        marginLeft: 10,
        backgroundColor: theme.colors.background.primary,
    },
    feedPostContainer: {
        paddingTop: 16,
        paddingHorizontal: 20
    },
});
