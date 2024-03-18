import React, { ReactElement } from 'react';
import { View, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomText } from './CustomText';
import CustomButton from './CustomButton';
import { SvgProps, SvgUri } from 'react-native-svg';


interface CustomBottomSheetProps {
  title: string;
  desc: string;
  index: number;
  Image?: React.FC<SvgProps>;
  onChange: (index: number) => void;
  onPrimaryButtonPress: () => void;
  onSecondaryButtonPress?: () => void;
}

const CustomBottomSheet = React.forwardRef<BottomSheet, CustomBottomSheetProps>((props, ref) => {
  const { title, desc, index, Image, onChange, onPrimaryButtonPress, onSecondaryButtonPress } = props;
  // Determine snapPoints based on the props
  let snapPoints: string[];
  if (Image && onSecondaryButtonPress) {
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
      onChange={onChange}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {Image && <Image width={250} height={250}/>}
        <CustomText fontVariant="L" fontWeight='Bold'>{title}</CustomText>
        <CustomText fontVariant="M" style={{ marginTop: 8 }}>{desc}</CustomText>
        <CustomButton title="Primary Button" onPress={onPrimaryButtonPress} />
        {onSecondaryButtonPress && <CustomButton title="Secondary Button" buttonColorVariant="secondary" onPress={onSecondaryButtonPress} />}
      </View>
    </BottomSheet>
  );
});

export default CustomBottomSheet;