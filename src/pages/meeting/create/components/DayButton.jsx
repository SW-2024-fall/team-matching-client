// src/components/DayButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DayButton = ({ day, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
  },
  selected: {
    backgroundColor: '#007BFF',
    color: '#ffffff',
    borderColor: '#007BFF',
  },
  text: {
    color: '#000',
    fontSize: 12,
  },
  selectedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DayButton;
