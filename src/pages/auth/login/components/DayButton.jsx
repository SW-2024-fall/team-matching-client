// src/components/DayButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DayButton = ({ day, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={styles.text}>{day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  selected: {
    backgroundColor: '#0082FF',
    color: '#ffffff',
  },
  text: {
    color: '#000',
  },
});

export default DayButton;
