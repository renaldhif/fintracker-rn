import React, { ReactElement } from 'react';
import { View, Button, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomText } from './CustomText';
import CustomButton from './CustomButton';
import { SvgProps, SvgUri } from 'react-native-svg';
import ErrorIllust from '../assets/images/warning.svg';

interface CustomBottomSheetProps {
  title: string;
  desc: string;
  index: number;
  Image?: React.FC<SvgProps>;
  variant?: 'default' | 'confirmation' | 'error';
  onChange: (index: number) => void;
  onPrimaryButtonPress: () => void;
  onSecondaryButtonPress?: () => void;
}

const CustomBottomSheet = React.forwardRef<BottomSheet, CustomBottomSheetProps>((props, ref) => {
  const { title, desc, index, Image, variant, onChange, onPrimaryButtonPress, onSecondaryButtonPress } = props;
  // Determine snapPoints based on the props
  let snapPoints: string[];
  if (Image && onSecondaryButtonPress) {
    snapPoints = ['75%'];
  } else if (onSecondaryButtonPress) {
    snapPoints = ['60%'];
  } else {
    snapPoints = ['50%'];
  }

  const renderDefaultContent = () => (
    <>
      {Image && <Image />}
      <CustomText fontVariant="L" fontWeight='Bold'>{title}</CustomText>
      <CustomText fontVariant="M" style={{ marginTop: 8 }}>{desc}</CustomText>
      <CustomButton title="Primary Button" onPress={onPrimaryButtonPress} />
    </>
  );

  const renderConfirmationContent = () => (
    <>
      {Image && <Image />}
      <CustomText fontVariant="L" fontWeight='Bold'>{title}</CustomText>
      <CustomText fontVariant="M" style={{ marginTop: 8 }}>{desc}</CustomText>
      <CustomButton title="Primary Button" onPress={onPrimaryButtonPress} />
      {onSecondaryButtonPress && <CustomButton title="Secondary Button" buttonColorVariant="secondary" onPress={onSecondaryButtonPress} />}
    </>
  );

  const renderErrorContent = () => (
    <View style={{ flexGrow: 1, }}>
      <ErrorIllust />
      <CustomText fontVariant="L" fontWeight='Bold'>{title}</CustomText>
      <CustomText fontVariant="M" style={{ marginTop: 8 }}>{desc}</CustomText>
      <CustomButton title="Primary Button" onPress={onPrimaryButtonPress} />
    </View>
  );
  const renderContent = () => {
    switch (variant) {
      case 'default':
        return (
          <BottomSheetView>
            {renderDefaultContent()}
          </BottomSheetView>
        );
      case 'confirmation':
        return (
          <BottomSheetView>
            {renderConfirmationContent()}
          </BottomSheetView>
        );
      case 'error':
        return (
          <BottomSheetView style={{ flexGrow: 1, backgroundColor: 'blue', height: 80 }}>
            {renderErrorContent()}
          </BottomSheetView>
        );
      default:
        return (
          <BottomSheetView>
            {renderDefaultContent()}
          </BottomSheetView>
        );
    }
  };

  return (
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={onChange}
      >
          {renderContent()}
      </BottomSheet>
  );
});

export default CustomBottomSheet;