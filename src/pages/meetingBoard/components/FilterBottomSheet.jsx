import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';

const FilterBottomSheet = ({ visible, onClose, onApply }) => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [meetingType, setMeetingType] = useState(null);
    const [minParticipants, setMinParticipants] = useState('2');
    const [maxParticipants, setMaxParticipants] = useState('99');
    const [activeFilter, setActiveFilter] = useState('category');

    const categories = [
        "학술/연구", "인문학/책/글", "사진/영상", "운동",
        "외국/언어", "음악/악기", "댄스/무용", "면접/취준", 
        "공연/축제", "캠핑/여행", "봉사활동", "게임/오락"
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
            minParticipants,
            maxParticipants,
        };
        onApply(filters);
        onClose();
        bottomSheetModalRef.current?.close();
    };

    const handleOpen = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onDismiss={onClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>필터</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </Pressable>
                    </View>
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
                    <View style={styles.separator} />
                    <View style={styles.content}>
                        {activeFilter === 'category' && (
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
                        )}
                        {activeFilter === 'meetingType' && (
                            <View style={styles.optionContainer}>
                                <Pressable onPress={() => setMeetingType('일회성')}>
                                    <Text>일회성</Text>
                                </Pressable>
                                <Pressable onPress={() => setMeetingType('정기')}>
                                    <Text>정기</Text>
                                </Pressable>
                            </View>
                        )}
                        {activeFilter === 'participants' && (
                            <View style={styles.participantsContainer}>
                                <TextInput
                                    keyboardType="numeric"
                                    value={minParticipants.toString()}
                                    onChangeText={text => setMinParticipants(Number(text))}
                                    style={styles.participantsInput}
                                />
                                <Text>~</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={maxParticipants.toString()}
                                    onChangeText={text => setMaxParticipants(Number(text))}
                                    style={styles.participantsInput}
                                />
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyButtonText}>적용</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    filterTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    tabText: {
        fontSize: 16,
        paddingVertical: 10,
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    separator: {
        borderWidth: 0.5,
    },
    content: {
        marginTop: 20,
    },
    checkboxGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        marginVertical: 5,
    },
    checkbox: {
        marginRight: 4,
    },
    applyButton: {
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    applyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FilterBottomSheet;
