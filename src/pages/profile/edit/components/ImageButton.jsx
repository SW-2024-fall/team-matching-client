import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

const ImageButton = ({ title, onPress, isSelected, imageSource, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
    >
      <View style={[styles.imageContainer, isSelected && styles.selectedImageContainer]}>
        <Image source={imageSource} style={[styles.image, isSelected && styles.selectedImage]} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 5,
    margin: 5, // 버튼 간격 조정
    backgroundColor: 'transparent', // 기본 배경 투명
  },
  selectedImageContainer: {
    backgroundColor: '#007BFF', // 선택된 버튼 색상
  },
  imageContainer: {
    width: 50,  // 이미지 컨테이너 너비
    height: 50, // 이미지 컨테이너 높이
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: 50,  // 실제 이미지 너비
    height: 50, // 실제 이미지 높이
  },
  selectedImage: {
    opacity: 0.5,
  },
  text: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 5,
    color: '#000', // 텍스트 색상
  },
});

export default ImageButton;