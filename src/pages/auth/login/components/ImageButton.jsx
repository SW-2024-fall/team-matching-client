// src/components/ImageButton.js 
// image button for selecting types of meeting
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ImageButton = ({ title, onPress, style }) => {
	return (
	  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
		<Text style={styles.buttonText}>{title}</Text>
	  </TouchableOpacity>
	);
  };
  

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#f0f0f0',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		margin: 5, // 간격 조정
		minWidth: 80, // 최소 너비 줄이기
		alignItems: 'center',
	  },
	  buttonText: {
		fontSize: 14, // 텍스트 크기 줄이기
	  },
});

export default ImageButton;
