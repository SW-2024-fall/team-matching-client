// src/components/RadioButtonGroup.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button'; // 기존 Button 컴포넌트 사용

const RadioButtonGroup = ({ options, selectedOption, onSelect, selectedButtonStyle, buttonStyle }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Button
          key={option}
          title={option}
          onPress={() => onSelect(option)}
          selected={selectedOption === option} // 선택 상태 전달
          style={selectedOption === option ? selectedButtonStyle : buttonStyle} // 스타일 적용
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
});

export default RadioButtonGroup;
