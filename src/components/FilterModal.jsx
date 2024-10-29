import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';

const FilterModal = ({ visible, onClose, onApply }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const filterOptions = ['#친목', '#학술', '#문화', '#여행', '#스포츠'];

    const toggleFilter = (filter) => {
        setSelectedFilters(prev => 
            prev.includes(filter) ? prev.filter(item => item !== filter) : [...prev, filter]
        );
    };

    const applyFilter = () => {
        onApply(selectedFilters);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.title}>필터 선택</Text>
                <FlatList
                    data={filterOptions}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => toggleFilter(item)}>
                            <Text style={{ 
                                ...styles.filterOption, 
                                fontWeight: selectedFilters.includes(item) ? 'bold' : 'normal' 
                            }}>
                                {item}
                            </Text>
                        </Pressable>
                    )}
                    keyExtractor={item => item}
                />
                <Button title="적용" onPress={applyFilter} />
                <Button title="취소" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    filterOption: {
        fontSize: 18,
        padding: 10,
    },
});

export default FilterModal;
