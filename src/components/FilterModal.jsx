import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Pressable, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import RadioButtonRN from 'radio-buttons-react-native'; // 라디오 버튼 컴포넌트
import {theme} from '@styles/ThemeStyles'

const FilterModal = ({ visible, onClose, onApply }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [meetingType, setMeetingType] = useState(null);
    const [recruitmentStatus, setRecruitmentStatus] = useState(null);
    const [minParticipants, setMinParticipants] = useState(2);
    const [maxParticipants, setMaxParticipants] = useState(99);
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
                    <Pressable onPress={() => setActiveFilter('recruitmentStatus')}>
                        <Text style={[styles.tabText, activeFilter === 'recruitmentStatus' && styles.activeTabText]}>모집 여부</Text>
                    </Pressable>
                    <Pressable onPress={() => setActiveFilter('participants')}>
                        <Text style={[styles.tabText, activeFilter === 'participants' && styles.activeTabText]}>인원 수</Text>
                    </Pressable>
                </View>

                {/* 선택된 필터에 따라 옵션 표시 */}
                <View style={styles.content}>
                    {activeFilter === 'category' && (
                        <View style={styles.optionContainer}>
                            {categories.map(category => (
                                <View key={category} style={styles.checkboxContainer}>
                                    <Checkbox
                                        value={selectedCategory.includes(category)}
                                        onValueChange={() => toggleCategory(category)}
                                    />
                                    <Text>{category}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    
                    {activeFilter === 'meetingType' && (
                        <View style={styles.optionContainer}>
                            <RadioButtonRN
                                data={[{label: '일회성'}, {label: '정기'}]}
                                selectedBtn={(e) => setMeetingType(e.label)}
                                initial={meetingType === '일회성' ? 1 : meetingType === '정기' ? 2 : 0}
                            />
                        </View>
                    )}

                    {activeFilter === 'recruitmentStatus' && (
                        <View style={styles.optionContainer}>
                            <RadioButtonRN
                                data={[{label: '모집 중'}, {label: '모집 완료'}]}
                                selectedBtn={(e) => setRecruitmentStatus(e.label)}
                                initial={recruitmentStatus === '모집 중' ? 1 : recruitmentStatus === '모집 완료' ? 2 : 0}
                            />
                        </View>
                    )}

                    {activeFilter === 'participants' && (
                        <View style={styles.optionContainer}>
                            <TextInput
                                keyboardType="numeric"
                                value={minParticipants.toString()}
                                onChangeText={text => setMinParticipants(Number(text))}
                                style={styles.input}
                                placeholder="최소 인원"
                            />
                            <TextInput
                                keyboardType="numeric"
                                value={maxParticipants.toString()}
                                onChangeText={text => setMaxParticipants(Number(text))}
                                style={styles.input}
                                placeholder="최대 인원"
                            />
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="적용" onPress={handleApply} />
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
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: theme.font.size.large,
        fontWeight: theme.font.weight.bold,
    },
    closeButton: {
        fontSize: theme.font.size.large,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        borderRadius: theme.border.primary,
        backgroundColor: theme.colors.blue.primary,
    },
});

export default FilterModal;
