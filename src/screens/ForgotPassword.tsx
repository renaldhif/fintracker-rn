import * as Yup from 'yup';
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomSheet from '../components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import StorageKey from '../utils/StorageKey';
import { CustomText } from '../components/CustomText';
import Colors from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import ForgotPasswordIllust from '../assets/images/forgot-password.svg';
import CustomModal from '../components/CustomModal';
import { getFirebaseErrorMessages } from '../utils/FirebaseErrorMessages';
import EmailSentIllust from '../assets/images/email-sent.svg';

const ForgotPassword = ({ navigation }: { navigation: any }) => {
  type ModalContent = {
    title: string;
    subtitle: string;
    variant: 'default' | 'error' | 'confirmation';
    image?: any;
  };
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [modalContent, setModalContent] = useState<ModalContent>({ title: '', subtitle: '', variant: 'default' });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false); // check if the user has tried to send email to display error message

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const EmailSchema = Yup.string().email('Invalid email').required('Email is required');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (isCheck) {
      try {
        EmailSchema.validateSync(text);
        setEmailError('');
      } catch (error: any) {
        setEmailError(error.message);
      }
    }
  };

  const sendEmail = async () => {
    setIsCheck(true);
    try {
      setIsLoading(true);
      ForgotPasswordSchema.validateSync({ email }, { abortEarly: false });
      setEmailError('');
      await auth().sendPasswordResetEmail(email).then(() => {
        setIsLoading(false);
        setIsModalVisible(true);
        setModalContent({
          title: 'Email Sent',
          subtitle: 'Please check your email to reset your password.',
          variant: 'default',
        });
      });
    } catch (error: any) {
      setIsLoading(false);
      if (error.code) {
        // Handle Firebase authentication errors
        setIsModalVisible(true);
        setModalContent({
          title: 'Unable to send email',
          subtitle: getFirebaseErrorMessages(error.code),
          variant: 'error',
        });
      } else {
        setEmailError(error.message);
      }
    }
  };

  const goToLogin = () => {
    navigation.replace('Login');
  }

  return (
    <ScrollView style={styles.container}>
      <CustomText fontVariant="XXXL" fontWeight='Medium' style={{ marginBottom: 4, marginRight: 4, marginTop: 12}}>Forgot Your Password?</CustomText>
      <CustomText fontVariant="M" style={{ lineHeight: 22 }}>No worries! Let's get you back in with a new password!</CustomText>
      <View style={{ alignItems: 'center'}}>
        <ForgotPasswordIllust width={300} height={300} />
      </View>
      <CustomTextInput
        required
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        type="email"
        placeholder="johndoe@example.com"
        error={emailError}
      />
      <View style={{ height: 4 }} />
      <CustomButton
        title="Send Email"
        isLoading={isLoading}
        onPress={sendEmail}
        buttonColorVariant="primary"
        buttonVariant="buttonText"
      />
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <CustomText fontVariant='M' fontWeight='Regular' style={{ textAlign: 'center' }}>Remember your password?</CustomText>
          <TouchableOpacity onPress={goToLogin}>
            <CustomText fontVariant='M' fontWeight='Bold' style={{ textAlign: 'center', color: Colors.primary, marginLeft: 4 }}>Login</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        title={modalContent.title}
        visible={isModalVisible}
        variant={modalContent.variant}
        message={modalContent.subtitle}
        Image={modalContent.variant === 'default' ? EmailSentIllust : undefined}
        primaryButtonTitle="OK"
        onPrimaryButtonPress={() => setIsModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background_light,
    flex: 1,
    padding: 16,
  },
});

export default ForgotPassword;
