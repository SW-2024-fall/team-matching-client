// src/components/RadioButtonGroup.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button'; // 기존 Button 컴포넌트 사용

const RadioButtonGroup = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Button
          key={option}
          title={option}
          onPress={() => onSelect(option)}
          selected={selectedOption === option}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default RadioButtonGroup;
