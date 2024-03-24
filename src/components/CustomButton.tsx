import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle, TextStyle, View, TouchableOpacity, StyleSheet, ImageComponent } from 'react-native';
import Colors from './Colors';
import { CustomText } from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomButtonProps {
  buttonColorVariant?: 'primary' | 'secondary' | 'disabled';
  buttonVariant?: 'buttonText' | 'buttonIcon' | 'buttonTextIconLeft' | 'buttonTextIconRight';
  buttonShape?: 'rounded' | 'circle' | 'rectangle' | 'pill';
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  iconName?: string;
  iconSize?: number;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ buttonStyle, titleStyle, title, isLoading, disabled, onPress, buttonColorVariant, buttonVariant, buttonShape, iconName, iconSize }) => {
  let backgroundColor, borderColor, borderRadius, textColor;

  const renderIcon = () => {
    if (iconName && iconSize) {
      return <Icon name={iconName} size={iconSize} color="white" style={{ marginLeft: 4 }} />;
    }
    return null;
  };

  const renderContent = (textColor: string) => {
    switch (buttonVariant) {
      case 'buttonText':
        return <CustomText fontVariant='L' fontWeight='Medium' style={[styles.title, titleStyle, { color: textColor }]}>{title}</CustomText>;
      case 'buttonIcon':
        return renderIcon();
      case 'buttonTextIconLeft':
        return (
          <>
            {renderIcon()}
            <CustomText fontVariant='L' fontWeight='Medium' style={[styles.title, titleStyle, { marginLeft: 4, color: textColor }]}>{title}</CustomText>
          </>
        );
      case 'buttonTextIconRight':
        return (
          <>
            <CustomText fontVariant='L' fontWeight='Medium' style={[styles.title, titleStyle, { marginRight: 4, color: textColor }]}>{title}</CustomText>
            {renderIcon()}
          </>
        );
      default:
        return <CustomText fontVariant='L' fontWeight='Medium' style={[styles.title, titleStyle, { color: textColor }]}>{title}</CustomText>;
    }
  };

  // Set button background color and border color based on buttonColorVariant
  switch (buttonColorVariant) {
    case 'primary':
      backgroundColor = Colors.primary;
      borderColor = Colors.primary;
      textColor = Colors.background_light;
      break;
    case 'secondary':
      backgroundColor = Colors.background_light;
      borderColor = Colors.primary;
      textColor = Colors.primary;
      break;
    case 'disabled':
      backgroundColor = Colors.gray.primary;
      borderColor = Colors.gray.primary;
      textColor = Colors.background_light;
      break;
    default:
      backgroundColor = Colors.primary;
      borderColor = Colors.primary;
      textColor = Colors.background_light;
      break;
  }

  // Set button border radius based on buttonShape
  switch (buttonShape) {
    case 'rounded':
      borderRadius = 8;
      break;
    case 'circle':
      borderRadius = 50;
      break;
    case 'rectangle':
      borderRadius = 0;
      break;
    case 'pill':
      borderRadius = 20; 
      break;
    default:
      borderRadius = 8;
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, buttonStyle, { backgroundColor, borderColor, borderRadius }]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          renderContent(textColor)
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
  },
});

export default CustomButton;