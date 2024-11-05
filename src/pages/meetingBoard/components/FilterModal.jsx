import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import RadioButtonRN from 'radio-buttons-react-native'; // 라디오 버튼 컴포넌트
import { theme } from '@styles/ThemeStyles';

const FilterModal = ({ visible, onClose, onApply }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [meetingType, setMeetingType] = useState(null);
    const [minParticipants, setMinParticipants] = useState('2');
    const [maxParticipants, setMaxParticipants] = useState('99');
    const [activeFilter, setActiveFilter] = useState('category'); // 기본 활성화 필터는 '카테고리'

    const categories = [
        "학술/연구",
        "인문학/책/글",
        "사진/영상",
        "운동",
        "외국/언어",
        "음악/악기",
        "댄스/무용",
        "면접/취준",
        "공연/축제",
        "캠핑/여행",
        "봉사활동",
        "게임/오락",
        "기타"
    ];

    const toggleCategory = (category) => {
        setSelectedCategory(prev => 
            prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
        );
    };

    const handleApply = () => {
        const filters = {
            categories: selectedCategory,
            meetingType,
            recruitmentStatus,
            minParticipants,
            maxParticipants,
        };
        onApply(filters);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
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
                                        <Text style={styles.checkboxText}>{category}</Text>
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

                    {activeFilter === 'recruitmentStatus' && (
                        <View style={styles.optionContainer}>
                            <View style={styles.radioContainer}>
                                <Pressable onPress={() => setRecruitmentStatus('모집 중')} style={styles.radioButton}>
                                    <View style={[styles.radioSquare, recruitmentStatus === '모집 중' && styles.selectedRadio]} />
                                    <Text style={[styles.radioText, recruitmentStatus === '모집 중' && styles.selectedRadioText]}>모집 중</Text>
                                </Pressable>
                                <Pressable onPress={() => setRecruitmentStatus('모집 완료')} style={styles.radioButton}>
                                    <View style={[styles.radioSquare, recruitmentStatus === '모집 완료' && styles.selectedRadio]} />
                                    <Text style={[styles.radioText, recruitmentStatus === '모집 완료' && styles.selectedRadioText]}>모집 완료</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}

                    {/* 인원 수 디자인 변경 */}
                    {activeFilter === 'participants' && (
                        <View style={styles.optionContainer}>
                            <View style={styles.participantsContainer}>
                                <Text style={styles.participantsLabel}>최소</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={minParticipants.toString()}
                                    onChangeText={text => setMinParticipants(Number(text))}
                                    style={styles.participantsInput}
                                    placeholder="2"
                                />
                                <Text style={styles.participantsLabel}>명</Text>
                                <Text style={styles.participantsLabel}>~</Text>
                                <Text style={styles.participantsLabel}>최대</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={maxParticipants.toString()}
                                    onChangeText={text => setMaxParticipants(Number(text))}
                                    style={styles.participantsInput}
                                    placeholder="99"
                                />
                                <Text style={styles.participantsLabel}>명</Text>
                            </View>
                        </View>
                    )}
                </View>
                {/*적용 버튼*/}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyButtonText}>적용</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
        padding: 20,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '70%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontColor: theme.font.color.primary,
        fontWeight: theme.font.weight.bold,
    },
    title: {//필터
        fontSize: theme.font.size.large,
        fontWeight: theme.font.weight.extraBold,
    },
    separator :{//구분선
        borderWidth: 0.5,
        borderColor: theme.colors.divider,
    },
    closeButton: {//닫기(x) 버튼
        fontSize: theme.font.size.large,
        fontColor: theme.font.weight.bold,
    },
    filterTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background.primary,
    },
    tabText: {
        fontSize: theme.font.size.primary,
        paddingVertical: 10,
        color: theme.font.color.light,
    },
    activeTabText: {
        color: theme.font.color.primary,
        fontWeight: theme.font.weight.bold,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.background.primary,
    },
    content: {
        flex: 1,
        marginTop: 20,
    },
    optionContainer: {
        paddingVertical: 10,
    },
    checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%', // 3열로 배열하기 위해 각 항목의 너비를 설정
        marginVertical: 5,
    },
    checkbox: {
        width: 10,
        height: 10,
        marginRight: 4,
        borderRadius: 0,
        borderWidth: 1.5,
        borderColor: theme.colors.grey.border,
    },
    checkboxText: {
        color: theme.font.color.light,
    },
    //모임유형, 모집여부 -> 라디오버튼 
    radioContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 0,
        padding: 10,
    },
    radioSquare: {
        width: 10,
        height: 10,
        borderWidth: 1.5,
        borderColor: theme.colors.grey.border,
        backgroundColor: 'transparent',
        marginRight: 8,
        borderRadius: 0,
    },
    selectedRadio: {
        backgroundColor: theme.colors.blue.primary, // Change to primary color when selected
        borderColor: theme.colors.grey.blur,
    },
    radioText: {
        color: theme.font.color.light,
        fontSize: theme.font.size.small,
    },
    selectedRadioText:{
        color: theme.font.color.primary,
    },
    participantsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderColor: theme.border.color,
    },
    participantsLabel : {
        color : theme.font.color.primary,
    },
    participantsInput :{//숫자 박스
        borderWidth: 1,  
        borderColor: theme.border.color,  
        padding: 8,  
        width: 50,  
        height: 40, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grey.border,
        marginVertical: 10,
        padding: 10,
    },
    buttonContainer: {
        backgroundColor: theme.colors.blue.primary,
        borderRadius: theme.border.radius.primary,
        padding: 20,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: theme.colors.blue.primary,
        borderRadius: theme.border.radius.primary,
        paddingVertical: 0, // 수직 패딩 추가 안함
        paddingHorizontal: 10, // 수평 패딩
        alignItems: 'center', // 텍스트를 중앙에 정렬
    },
    applyButtonText: {
        color: theme.colors.background.primary,
        fontWeight: theme.font.weight.bold,
        fontSize: theme.font.size.primary,
        textAlign: 'center', // 텍스트 중앙 정렬
    },
});

export default FilterModal;