import React from 'react';
import { StyleSheet, Text, TextStyle, StyleProp } from 'react-native';
import Colors from './Colors';

export type CustomTextProps = {
  style?: StyleProp<TextStyle>;
  fontWeight?: 'Thin' | 'Light' | 'Regular' | 'Medium' | 'Bold' | 'Heavy';
  fontVariant?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
  children: React.ReactNode;
};

const defaultStyle = StyleSheet.create({
  text: {
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    color: Colors.text,
  },
});

export const CustomText = ({ style, children, fontWeight, fontVariant }: CustomTextProps) => {
  let dynamicStyle: TextStyle = {};

  switch (fontWeight) {
    case 'Thin':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Thin' };
      break;
    case 'Light':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Light' };
      break;
    case 'Regular':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Regular' };
      break;
    case 'Medium':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Medium' };
      break;
    case 'Bold':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Bold' };
      break;
    case 'Heavy':
      dynamicStyle = { ...dynamicStyle, fontFamily: 'AvenirNextCyr-Heavy' };
      break;
  }

  switch (fontVariant) {
    case 'XS':
      dynamicStyle = { ...dynamicStyle, fontSize: 12 };
      break;
    case 'S':
      dynamicStyle = { ...dynamicStyle, fontSize: 14 };
      break;
    case 'M':
      dynamicStyle = { ...dynamicStyle, fontSize: 16 };
      break;
    case 'L':
      dynamicStyle = { ...dynamicStyle, fontSize: 18 };
      break;
    case 'XL':
      dynamicStyle = { ...dynamicStyle, fontSize: 20 };
      break;
    case 'XXL':
      dynamicStyle = { ...dynamicStyle, fontSize: 24 };
      break;
    case 'XXXL':
      dynamicStyle = { ...dynamicStyle, fontSize: 28 };
      break;
  }

  return (
    <Text style={[defaultStyle.text, style, dynamicStyle]}>{children}</Text>
  );
};