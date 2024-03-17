import React from 'react';
import { View, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomText } from './CustomText';
import CustomButton from './CustomButton';


interface CustomBottomSheetProps {
  title: string;
  desc: string;
  index: number;
  image?: string;
  onPrimaryButtonPress: () => void;
  onSecondaryButtonPress?: () => void;
}

const CustomBottomSheet = React.forwardRef<BottomSheet, CustomBottomSheetProps>((props, ref) => {
  const { title, desc, index, image, onPrimaryButtonPress, onSecondaryButtonPress } = props;
  // Determine snapPoints based on the props
  let snapPoints: string[];
  if (image && onSecondaryButtonPress) {
    snapPoints = ['75%'];
  } else if (onSecondaryButtonPress) {
    snapPoints = ['60%'];
  } else {
    snapPoints = ['45%'];
  }

  return (
    <BottomSheet
      ref={ref}
      index={index}
      snapPoints={snapPoints}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomText fontVariant="L" fontWeight='Bold'>{title}</CustomText>
        <CustomText fontVariant="M" style={{ marginTop: 8 }}>{desc}</CustomText>
        <CustomButton title="Primary Button" onPress={onPrimaryButtonPress} />
        {onSecondaryButtonPress && <CustomButton title="Secondary Button" buttonColorVariant="secondary" onPress={onSecondaryButtonPress} />}
      </View>
    </BottomSheet>
  );
});

export default CustomBottomSheet;