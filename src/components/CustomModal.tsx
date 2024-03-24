import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal, { ModalProps } from 'react-native-modals';
import { CustomText } from './CustomText';
import CustomButton from './CustomButton';
import { SvgProps } from 'react-native-svg';
import ErrorIllust from '../assets/images/warning.svg';

interface CustomModalProps {
  visible: boolean;
  variant: 'default' | 'confirmation' | 'error';
  title: string;
  message: string;
  primaryButtonTitle: string;
  secondaryButtonTitle?: string;
  Image?: React.FC<SvgProps>;
  onPrimaryButtonPress: () => void;
  onSecondaryButtonPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, variant, title, message, Image, primaryButtonTitle, secondaryButtonTitle, onPrimaryButtonPress, onSecondaryButtonPress }) => {
  const renderContent = () => {
    switch (variant) {
      case 'default':
        return (
          <View style={styles.container}>
            {Image && <Image />}
            <CustomText fontVariant="XL" fontWeight='Bold' style={{ marginBottom: 8 }}>{title}</CustomText>
            <CustomText fontVariant='M' style={{ marginBottom: 16, textAlign: 'center' }}>{message}</CustomText>
            <CustomButton title={primaryButtonTitle ? primaryButtonTitle : "OK"} onPress={onPrimaryButtonPress} />
          </View>
        );
      case 'confirmation':
        return (
          <View style={styles.container}>
            {Image && <Image />}
            <CustomText fontVariant="XL" fontWeight='Bold' style={{ marginBottom: 8 }}>{title}</CustomText>
            <CustomText fontVariant='M' style={{ marginBottom: 16, textAlign: 'center' }}>{message}</CustomText>
            <CustomButton title={primaryButtonTitle ? primaryButtonTitle : "OK"} onPress={onPrimaryButtonPress} />
            {onSecondaryButtonPress && <CustomButton title={secondaryButtonTitle ? secondaryButtonTitle : "Back"} buttonColorVariant="secondary" onPress={onSecondaryButtonPress} />}
          </View>
        );
      case 'error':
        return (
          <View style={styles.container}>
            <ErrorIllust width={150} height={150}/>
            <CustomText fontVariant="XL" fontWeight='Bold' style={{ marginBottom: 8 }}>{title}</CustomText>
            <CustomText fontVariant='M' style={{ marginBottom: 16, textAlign: 'center' }}>{message}</CustomText>
            <CustomButton title={primaryButtonTitle ? primaryButtonTitle : "OK"} onPress={onPrimaryButtonPress} />
          </View>
        );
    }
  };

  return (
    <Modal 
      visible={visible}
    >
      {renderContent()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default CustomModal;