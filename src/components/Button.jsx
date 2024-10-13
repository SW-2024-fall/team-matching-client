// src/components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, selected, isNextButton, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, 
          style
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
    borderColor: '#B0B8C1'
  },
  selected: {
    backgroundColor: '#007BFF', // 선택된 색상 (파란색)
  },
  default: {
    backgroundColor: '#ccc', // 선택되지 않은 색상 (회색)
  },
  nextButton: {
    backgroundColor: '#007BFF', // 항상 파란색
  },
  buttonText: {
    color: '#333333',
    fontSize: 12,
  },
});

export default Button;
