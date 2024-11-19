// src/components/Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, style, multiline}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      editable={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default Input;