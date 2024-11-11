import { Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import FilterIcon from '@assets/filterIcon.svg';
import { WithLocalSvg } from 'react-native-svg/css';
import { useEffect } from 'react';

function FilterBtn() {
  return <WithLocalSvg asset={FilterIcon} width={20} height={18} />;
}

export default function MeetingBoard({ navigation }) {
<<<<<<< Updated upstream
=======
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, filterVisible] = useState(null);
    const [filteredVisible, setFilterVisible] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(API_URL,{method:"GET"});
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
    
    /* //테스트 데이터 일때, 필터 적용
    const handleFilterApply = (filters) => {
        const { categories, meetingType, minParticipants, maxParticipants } = filters;

        const newData = DATA.filter(item => {
            const meetsCategory = categories.length === 0 || categories.some(category => item.features.includes(category));
            const meetsMeetingType = meetingType ? item.meetingType === meetingType : true;
            const meetsParticipants = item.currentParticipants >= minParticipants && item.currentParticipants <= maxParticipants;

            return meetsCategory && meetsMeetingType && meetsParticipants;
        });

        setFilteredData(newData);
        setFilterVisible(false);
    };*/

    const handleFilterApply = async (filters) => {
        const { meetingType, minParticipants, maxParticipants } = filters;
        try {
            setLoading(true);
            const url = `${API_URL}?categories=${selectedCategories.join(',')}&meetingType=${meetingType}&minParticipants=${minParticipants}&maxParticipants=${maxParticipants}`;
            const response = await fetch(url, { method: "GET" });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setData(json); // 필터링된 데이터를 setData로 설정합니다.
        } catch (error) {
            console.error('Error fetching filtered meetings:', error);
            setError(error.message);
        } finally {
            setLoading(false);
            setFilterVisible(false);
        }
    };
    

    const renderItem = ({ item }) => (
        <MeetingItem 
            item={item} 
            onPress={() => navigation.navigate(PAGES.MEETING_DETAIL, { itemId: item.id })} 
        />
    );

    const handleFloatingButtonPress = () => {
        navigation.navigate(PAGES.CREATE_MEETING);
    };

>>>>>>> Stashed changes
    return (
        <Layout screen={PAGES.MEETING_BOARD} RightComponent={FilterBtn}>
        <Text>Meeting Board</Text>
        <Pressable onPress={() => navigation.navigate(PAGES.MAIN)}>
            <Text>Let's go home</Text>
        </Pressable>
        </Layout>
    );
}
