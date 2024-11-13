import React, { useState , handleApply} from 'react';
import { Modal, View, Text, Button, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import RadioButtonRN from 'radio-buttons-react-native'; // 라디오 버튼 컴포넌트
import { theme } from '@styles/ThemeStyles';

const FilterModal = ({ visible, onClose, onApply }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [meetingType, setMeetingType] = useState(null);
    const [minParticipants, setMinParticipants] = useState(2);
    const [maxParticipants, setMaxParticipants] = useState(99);
    const [activeFilter, setActiveFilter] = useState('category'); // 기본 활성화 필터는 '카테고리'

    const categoryMapping = {
        "학술/연구": "RESEARCH",
        "인문학/책/글": "LITERATURE",
        "사진/영상": "PHOTOGRAPHY",
        "운동": "EXERCISE",
        "외국/언어": "LANGUAGE",
        "음악/악기": "MUSIC",
        "댄스/무용": "DANCE",
        "면접/취준": "JOB_SEARCH",
        "공연/축제": "FESTIVAL",
        "캠핑/여행": "TRAVEL",
        "봉사활동": "VOLUNTEER",
        "게임/오락": "ENTERTAINMENT",
    };
    const categories = Object.keys(categoryMapping);

    const toggleCategory = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const meetingTypeMapping = {
        "일회성": "ONE_TIME",
        "정기": "REGULAR",
    };


    const handleApply = () => {
        const selectedCategoriesInEnglish = selectedCategory.map(
            (category) => categoryMapping[category]
        );
        const meetingTypeInEnglish = meetingType ? meetingTypeMapping[meetingType] : null;

        const filters = {
            categories: selectedCategoriesInEnglish,
            meetingType: meetingTypeInEnglish,
            minParticipants: Number(minParticipants),
            maxParticipants: Number(maxParticipants),
        };
        onApply(filters);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style ={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>필터</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </Pressable>
                    </View>

                    {/* 상단 필터 항목을 가로로 나열 */}
                    <View style={styles.filterTabs}>
                        <Pressable onPress={() => setActiveFilter('category')}>
                            <Text style={[styles.tabText, activeFilter === 'category' && styles.activeTabText]}>카테고리</Text>
                        </Pressable>
                        <Pressable onPress={() => setActiveFilter('meetingType')}>
                            <Text style={[styles.tabText, activeFilter === 'meetingType' && styles.activeTabText]}>모임 유형</Text>
                        </Pressable>
                        <Pressable onPress={() => setActiveFilter('participants')}>
                            <Text style={[styles.tabText, activeFilter === 'participants' && styles.activeTabText]}>인원 수</Text>
                        </Pressable>
                        
                    </View>
                    {/* 선 추가 */}
                    <View style={styles.separator} />
                    {/* 선택된 필터에 따라 옵션 표시 */}
                    <View style={styles.content}>
                        {activeFilter === 'category' && (
                            <View style={styles.optionContainer}>
                                <View style={styles.checkboxGrid}>
                                    {categories.map(category => (
                                        <View key={category} style={styles.checkboxContainer}>
                                            <Checkbox
                                                value={selectedCategory.includes(category)}
                                                onValueChange={() => toggleCategory(category)}
                                                style={styles.checkbox}
                                            />
                                            <Text style={[styles.checkboxText, selectedCategory.includes(category) && styles.selectedCheckboxText]}>
                                                {category}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                        
                        {activeFilter === 'meetingType' && (
                            <View style={styles.optionContainer}>
                                <View style={styles.radioContainer}>
                                    <Pressable onPress={() => setMeetingType('일회성')} style={styles.radioButton}>
                                        <View style={[styles.radioSquare, meetingType === '일회성' && styles.selectedRadio]} />
                                        <Text style={[styles.radioText, meetingType === '일회성' && styles.selectedRadioText]}>일회성</Text>
                                    </Pressable>
                                    <Pressable onPress={() => setMeetingType('정기')} style={styles.radioButton}>
                                        <View style={[styles.radioSquare, meetingType === '정기' && styles.selectedRadio]} />
                                        <Text style={[styles.radioText, meetingType === '정기' && styles.selectedRadioText]}>정기</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}

                        {/* 인원 수 디자인 변경 */}
                        {activeFilter === 'participants' && (
                            <View style={styles.optionContainer}>
                                <View style={styles.participantsContainer}>
                                    <View style ={styles.Participants}> 
                                        <Text style={styles.minMaxLabel}>최소</Text>
                                        <View style ={styles.inputTextContainer}> 
                                            <TextInput
                                                keyboardType="numeric"
                                                //value={minParticipants.toString()}
                                                onChangeText={text => setMinParticipants(Number(text))}
                                                style={styles.participantsInput}
                                                placeholder="2"
                                            />
                                            <Text style={styles.participantsLabel}>명</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.participantsLabel}>~</Text>
                                    <View style ={styles.Participants}>
                                        <Text style={styles.minMaxLabel}>최대</Text>
                                        <View style={styles.inputTextContainer}>
                                            <TextInput
                                                keyboardType="numeric"
                                                //value={maxParticipants.toString()}
                                                onChangeText={text => setMaxParticipants(Number(text))}
                                                style={styles.participantsInput}
                                                placeholder="99"
                                            />
                                            <Text style={styles.participantsLabel}>명</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    {/*적용 버튼*/} 
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.applyButtonText}>적용하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        padding: 20,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        width: '100%',
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontColor: theme.font.color.primary,
        fontWeight: '700',
    },
    title: {//필터
        fontSize: theme.font.size.large,
        fontWeight: '700',
    },
    separator :{//구분선
        borderWidth: 0.5,
        borderColor: theme.colors.divider,
    },
    closeButton: {//닫기(x) 버튼
        fontSize: theme.font.size.large,
        fontColor: theme.font.color.primary,
        fontWeight: "700"
    },
    filterTabs: {//카테고리, 모임유형, 인원수 부분
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background.primary,
    },
    tabText: {
        fontSize: theme.font.size.primary,
        paddingVertical: 20,
        color: theme.font.color.light,
        fontWeight: "400",
        paddingHorizontal: 10,
    },
    activeTabText: {
        color: theme.font.color.primary,
        fontWeight: "600",
        fontSize: theme.font.size.primary,
    },
    content: {
        flex: 1,
        marginVertical: 20,
    },
    optionContainer: {

    },
    checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '27%',
        paddingVertical:10,
        paddingHorizontal: 10,
    },
    checkbox: {
        width: 10,
        height: 10,
        marginRight: 4,
        borderWidth: 1.5,
        borderColor: theme.colors.grey.border,
    },
    checkboxText: {
        color: theme.font.color.light,
        fontSize: theme.font.size.small,
    },
    selectedCheckboxText:{
        color: theme.font.color.primary,
        fontSize: theme.font.size.small,
        fontWeight: '500',
    },
    //모임유형 -> 라디오버튼 
    radioContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    radioSquare: {
        width: 10,
        height: 10,
        borderWidth: 1.5,
        borderColor: theme.colors.grey.border,
        backgroundColor: 'transparent',
        marginRight: 8,
        borderRadius: 2,
    },
    selectedRadio: {
        backgroundColor: theme.colors.blue.primary, // Change to primary color when selected
        borderColor: 'transparent',
    },
    radioText: {
        color: theme.font.color.light,
        fontSize: theme.font.size.small,
    },
    selectedRadioText:{
        color: theme.font.color.primary,
        fontWeight: '500'
    },//인원 수
    participantsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderColor: theme.border.color,
        alignItems: 'center',
    },
    inputTextContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    Participants: {
        flexDirection: 'column',
    },
    minMaxLabel:{//"최소", "최대"레이블
        paddingBottom: 8,
        fontWeight: '400',
        fontSize: theme.font.size.small,
        color: theme.font.color.primary
    },
    participantsLabel : {//"명" 레이블
        fontWeight: '400',
        fontSize: theme.font.size.small,
        color: theme.font.color.primary
    },
    participantsInput :{//숫자 박스
        borderWidth: 1,
        width: 49,
        borderColor: theme.border.color,  
        paddingHorizontal: 10,
        paddingVertical: 8, 
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 8,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: theme.colors.blue.primary,
        borderRadius: theme.border.radius.primary,
        paddingTop: 13,
        height: 37,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: theme.colors.blue.primary,
        borderRadius: theme.border.radius.primary,
        alignItems: 'center', // 텍스트를 중앙에 정렬
    },
    applyButtonText: {
        color: theme.colors.background.primary,
        fontWeight: "700",
        fontSize: theme.font.size.primary,
        textAlign: 'center', // 텍스트 중앙 정렬
    },
});

export default FilterModal;