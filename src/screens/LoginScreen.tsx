import * as Yup from 'yup';
import { useCallback, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, Touchable, TouchableOpacity, View } from "react-native";
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
import LoginIllust from '../assets/images/login.svg';
import CustomModal from '../components/CustomModal';
import { getFirebaseErrorMessages } from '../utils/FirebaseErrorMessages';


const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorSubtitle, setErrorSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false); // check if the user has tried to login to display error message
  const [modalVariant, setModalVariant] = useState<'default' | 'confirmation' | 'error'>('default');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Separate schema for each field to display error message one by one
  const EmailSchema = Yup.string().email('Invalid email').required('Email is required');
  const PasswordSchema = Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');

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
  
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (isCheck) {
      try {
        PasswordSchema.validateSync(text);
        setPasswordError('');
      } catch (error: any) {
        setPasswordError(error.message);
      }
    }
  };

  const handleLogin = async () => {
    setIsCheck(true);
    try {
      setIsLoading(true);
      LoginSchema.validateSync({ email, password }, { abortEarly: false });
      setEmailError('');
      setPasswordError('');
  
      // Sign in with Firebase
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential;
      console.log('User signed in: ', user);
    } catch (error: any) {
      if (error.inner) {
        if (error.inner.length === 1) {
          if (error.inner[0].path === 'email') {
            setEmailError(error.inner[0].message);
          } else {
            setPasswordError(error.inner[0].message);
          }
        } else {
          setEmailError(error.inner[0].message);
          setPasswordError(error.inner[1].message);
        }
      } else {
        // Handle Firebase authentication errors
        setIsModalVisible(true);
        setModalVariant('error');
        setErrorTitle('Unable to login');
        setErrorSubtitle(getFirebaseErrorMessages(error.code));
        console.error('Firebase auth error: ', error);
      }
      setIsLoading(false);
      return;
    }
  };

  const goToRegister = () => {
    navigation.replace('Register');
  }

  return (
    <ScrollView style={styles.container}>
      <CustomText fontVariant="XXXL" fontWeight='Medium' style={{ marginBottom: 4, marginRight: 4, marginTop: 12}}>Welcome Back 👋</CustomText>
      <CustomText fontVariant="M" style={{ lineHeight: 22 }}>Login to continue your journey. Your financial adventure awaits!</CustomText>
      <View style={{ alignItems: 'center'}}>
        <LoginIllust width={300} height={250} />
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
      <CustomTextInput
        required
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        type="password"
        placeholder="Password"
        error={passwordError}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: -16, marginBottom: 16 }}>
        <CustomText fontVariant="M" fontWeight='Medium' style={{ textAlign: 'right', color: Colors.primary, marginTop: 8 }}>Forgot password?</CustomText>
      </TouchableOpacity>
      <CustomButton
        title="Login"
        isLoading={isLoading}
        onPress={handleLogin}
        buttonColorVariant="primary"
        buttonVariant="buttonText"
      />
      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <CustomText fontVariant='M' fontWeight='Regular' style={{ textAlign: 'center' }}>Don't have an account?</CustomText>
          <TouchableOpacity onPress={goToRegister}>
            <CustomText fontVariant='M' fontWeight='Bold' style={{ textAlign: 'center', color: Colors.primary, marginLeft: 4 }}>Register</CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        title={errorTitle}
        visible={isModalVisible}
        variant={modalVariant}
        message={errorSubtitle}
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

export default LoginScreen;