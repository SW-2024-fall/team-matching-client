// src/components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, selected, isNextButton }) => {
  return (
    <TouchableOpacity
      style={[styles.button, 
        isNextButton ? styles.nextButton : (selected ? styles.selected : styles.default)
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
    flex: 1,
    margin: 5,
  },
  selected: {
    backgroundColor: '#0082FF', // 선택된 색상 (파란색)
  },
  default: {
    backgroundColor: '#ccc', // 선택되지 않은 색상 (회색)
  },
  nextButton: {
    backgroundColor: '#0082FF', // 항상 파란색
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default Button;
