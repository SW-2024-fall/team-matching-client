import { PAGES } from '@navigation/constant';
import Layout from '@layout/layout';
import styled from 'styled-components/native';
import { theme } from '../../styles/ThemeStyles';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View ,Text, Pressable} from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import notScrap from '../../assets/notScrap.svg';
import scrap from '../../assets/scrap.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthProvider';

const Body = styled.View`
  padding: 30px 20px;
  gap: 20px;
  align-items: center;
`;

const RecommendTitleWrapper = styled.View`
  padding: 0 20px;
  gap: 10px;
  align-items: center;
`;

const RecommendTitle = styled.Text`
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.semiBold};
`;

const UserFeatureWrapper = styled.View`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const UserFeature = styled.View`
  padding: 8px 12px;
  border: solid 1px ${theme.colors.blue.primary};
  borderRadius: ${theme.border.radius.primary};
`;

const UserFeatureText = styled.Text`
  color: ${theme.colors.blue.primary};
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.semiBold};
`;

const RecommendCard = styled.TouchableOpacity`
  width: 100%;
  padding: 24px;
  gap: 10px;
  borderRadius: ${theme.border.radius.large};
  background-color: ${theme.colors.blue.primary};
`;

const MeetingThumbnail = styled.Image`
  width: 100%;
  height: 200px;
  borderRadius: ${theme.border.radius.medium};
`;

const MeetingTitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MeetingTitle = styled.Text`
  font-size: ${theme.font.size.large};
  font-weight: ${theme.font.weight.bold};
  color: ${theme.colors.background.primary};
`;

const MeetingFeatureWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const MeetingFeature = styled.Text`
  font-size: ${theme.font.size.small};
  color: ${theme.colors.background.primary};
`;

const MeetingCategoryWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const MeetingCategoryContainer = styled.View`
  padding: 4px 12px;
  borderRadius: ${theme.border.radius.small};
  background-color: ${theme.colors.background.primary};
`;

const MeetingCategory = styled.Text`
  font-size: ${theme.font.size.small};
  color: ${theme.colors.blue.primary};
`;

const MeetingContent = ({ content }) => {
  const MeetingContentText = styled.Text`
    color: ${theme.colors.background.primary};
  `;

  return (
    <MeetingContentText numberOfLines={3} ellipsizeMode="tail">
      {content}
    </MeetingContentText>
  );
};
const RecommendActionsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const RecommendActionButton = styled.Pressable`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`;

const RecommendActionButtonText = styled.Text`
  font-weight: ${theme.font.weight.medium};
  color: ${theme.font.color.primary};
`;

const RecommendReasonContainer = styled.View`
	padding: 10px;
	border: solid 1px white;
	border-radius: ${theme.border.radius.primary};
`;

const RecommendReason = styled.Text`
	font-size: ${theme.font.size.primary};
	font-weight: ${theme.font.weight.semiBold};
	color: white;
`;

export default function Recommend({ navigation }) {
	const [data,setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const[error, setError] = useState(null);
	const [page, setPage] = useState(0);
	const {user} = useAuth();
	const userData = user;
	const [meetingData, setMeetingData] = useState(null);
	const [meetingId , setMeetingId] = useState(0);
	const [re, setRe] = useState(false);
	const [isScrap, setIsScrap] = useState(false);
	// useEffect(()=>{
	// 	const fetchData = async () =>{
	// 		try{
	// 			const response = await fetch(`http://localhost:8080/api/users`, { method: "GET",headers: {'Authorization': `Bearer ${accessToken}`} });
	// 			const json = await response.json();
	// 			setFeatures(json.data.features);
	// 			console.log("rec user data = "+JSON.stringify(features));
	// 		}catch(error){
	// 			setError(error.message);
	// 		}finally{
	// 			setLoading(false);
	// 		}
	// 	}
	// 	fetchData();
	//   },[])
	useEffect(()=>{
		const fetchData = async()=>{
			try {
				const accessToken = await AsyncStorage.getItem('accessToken');
				console.log("meetingId"+meetingId);
				const responseMeeting = await fetch(`http://localhost:8080/api/meetings/${meetingId}`, { 
					method: "GET",
					headers: {'Authorization': `Bearer ${accessToken}`}
				})
				// .then(async (res)=>{
				// 	const jsonMeeting = await responseMeeting.json();
				// 	return jsonMeeting;
				// }).then((res)=>{
				// 	setMeetingData(res.data.info);
				// 	console.log("meetingData = "+JSON.stringify(meetingData));
				// }).then(()=>setLoading(false));
				const jsonMeeting = await responseMeeting.json();
				setMeetingData(jsonMeeting.data.info);
				console.log(jsonMeeting.data.scraped);
				setIsScrap(jsonMeeting.data.scraped);
				console.log("mmd = "+JSON.stringify(meetingData));
			}catch(error){

			}finally{
				// setLoading(false);
			}
		}
		fetchData();
	},[meetingId])
	useEffect(()=>{
		if(meetingData){
			console.log("meeetingData = "+ meetingData);
			setLoading(false);
		}
	},[meetingData])
	useEffect(()=>{
		if(data !== null && data[page]){
			console.log("data === "+JSON.stringify(data));
			setMeetingId(data[page].meetingId);
		}
	},[data, page])
	useEffect(()=>{
	const fetchData = async () =>{
		try{
			const accessToken = await AsyncStorage.getItem('accessToken');
			const response2 = await fetch(`http://localhost:8080/api/meetings/recommend`, { 
				method: "GET",
				headers: {'Authorization': `Bearer ${accessToken}`} 
			})
			// .then(async(res)=>{
			// 	const json2 = await res.json();
			// 	console.log("json2 = "+JSON.stringify(json2));
			// 	return json2;
			// }).then((res)=>{
			// 	setData(res.data);
			// 	console.log("data = "+JSON.stringify(data));
			// }).then(()=>{
			// 	setMeetingId(data[page].meetingId);
			// 	console.log("meetingId = "+meetingId);
			// });
			const json2 = await response2.json();
			console.log("json2 === "+JSON.stringify(json2.data));
			setData(json2.data);
			console.log("rec data = "+JSON.stringify(data));
			
		}catch(error){
			setError(error.message);
		}
	}
	fetchData();
  },[])
  const recommendAnotherMeeting = () => {
    setPage(page+1);
  };
  const goToMeetingDetail = () => {
    navigation.navigate(PAGES.MEETING, { id: meetingId, title: meetingData.name });
  };
  const onPressScrap = async() =>{
	if (isScrap){
		try {
			const accessToken = await AsyncStorage.getItem('accessToken');
			const response = await fetch(`http://localhost:8080/api/meetings/${meetingId}/scraps`, { method: "DELETE" ,headers: {'Authorization': `Bearer ${accessToken}`}});
			if (!response.ok) { throw new Error("Failed to 좋아요 취소"); }
			else{setRe(!re); setIsScrap(false);}
		} catch (error) { console.error("Error 좋아요 취소:", error); }
	}
	else{
		try {
			const accessToken = await AsyncStorage.getItem('accessToken');
			const response = await fetch(`http://localhost:8080/api/meetings/${meetingId}/scraps`, { method: "POST",headers: {'Authorization': `Bearer ${accessToken}`} });
			if (!response.ok) { throw new Error("Failed to 좋아요 추가"); }
			else{setRe(!re); setIsScrap(true);}
		} catch (error) { console.error("Error 좋아요 추가:", error); }

	}
  }
//   if (!userData || !data || !meetingData || loading) {
// 	const reRender = () => {
// 	  console.log(re);
// 	  setRe(!re);
// 	  // 필요한 조건이 충족되었는지 확인하고 더 이상 타이머를 실행하지 않음
// 	  if (userData && data && meetingData) {
// 		console.log("Data ready, stopping timer.");
// 		return;}
// 	  setTimeout(reRender, 3000);
// 	};	
//   setTimeout(reRender, 3000);
	//   }
  if (error) {
    return <Text style={{ fontSize: 20 }}>Error: {error}</Text>; // 에러 메시지 표시
  }
  return (
    <Layout screen={PAGES.RECOMMEND}>
		  <Body>
			{userData && (
					<RecommendTitleWrapper>
						<RecommendTitle>시대AI가 분석한 {userData.name}님의 추천 목록</RecommendTitle>
						<UserFeatureWrapper>
							{userData.features.map((feature, index) => (
								<UserFeature key={index}>
									<UserFeatureText># {feature}</UserFeatureText>
								</UserFeature>
							))}
						</UserFeatureWrapper>
						<RecommendTitle>에 맞게 추천드려요!</RecommendTitle>
					  </RecommendTitleWrapper>
					  )
			  }
			{!meetingData && (
				<ActivityIndicator style={{marginTop: 0, marginBottom: 0}} size="large" color="#444444" />
			)}
			{meetingData && (
				<>
					<RecommendCard onPress={goToMeetingDetail}>
						<RecommendReasonContainer>
							<RecommendReason>{data[page].reason}</RecommendReason>
						</RecommendReasonContainer>
						{meetingData.thumbnailUrls[0] ? <MeetingThumbnail source={{ uri: meetingData.thumbnailUrls[0] }} /> : <View/>}
						<MeetingTitleWrapper>
							<MeetingTitle>{meetingData.name}</MeetingTitle>
							<MeetingFeatureWrapper>
								{meetingData.features.map((feature, index) => (
									<MeetingFeature key={index}>#{feature}</MeetingFeature>
								))}
							</MeetingFeatureWrapper>
						</MeetingTitleWrapper>
						<MeetingCategoryWrapper>
					{meetingData.categories.map((category, index) => (
					<MeetingCategoryContainer key={index}>
						<MeetingCategory>{category}</MeetingCategory>
					</MeetingCategoryContainer>
					))}

				</MeetingCategoryWrapper>
				<MeetingContent content={meetingData.content} />
				</RecommendCard>
				<RecommendActionsWrapper>
				<RecommendActionButton onPress={onPressScrap}>
					{/* <WithLocalSvg asset={scrap}/> */}
					{isScrap ? 
						<WithLocalSvg asset={scrap}/>  : 
						<WithLocalSvg asset={notScrap}/>}
						<RecommendActionButtonText>스크랩하기</RecommendActionButtonText>
				</RecommendActionButton>
				<RecommendActionButton onPress={recommendAnotherMeeting}>
					<RecommendActionButtonText>다른 모임 추천받기</RecommendActionButtonText>
				</RecommendActionButton>
				</RecommendActionsWrapper>
			</>)}
      </Body>
    </Layout>
  );
}