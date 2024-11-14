import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SelectLabel = ({ label ,style}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.selectText}>선택</Text>
      <Text style={style}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
	marginTop: 20,
  },
  selectText: {
    color: '#B0B0B0', // 연한 회색
    marginRight: 5, // "선택"과 label 사이의 간격
  },
  labelText: {
    fontWeight: 'bold', // label 텍스트 강조
  },
});

export default SelectLabel;
