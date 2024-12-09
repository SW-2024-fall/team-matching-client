// src/components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, selected, isNextButton, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, 
        selected ? styles.selected : styles.default,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={selected ? styles.selectedText : styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#007BFF', // 선택된 색상 (파란색)
    borderColor: '#007BFF',
    borderWidth: 1,
  },
  default: {
    backgroundColor: '#ffffff', // 선택되지 않은 색상 (회색)
    borderColor: '#B0B8C1',
    borderWidth: 1,
  },
  nextButton: {
    backgroundColor: '#007BFF', // 항상 파란색
  },
  buttonText: {
    color: '#333333',
    fontSize: 12,
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Button;
