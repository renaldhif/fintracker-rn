import * as Yup from 'yup';
import { useCallback, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBottomSheet from '../components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import StorageKey from '../utils/StorageKey';
import DoneRegistration from '../assets/images/registration-success.svg';

const RegisterScreen = ({navigation}: {navigation: any}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [sheetIndex, setSheetIndex] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Separate schema for each field to display error message one by one
  const FullnameSchema = Yup.string().required('Full name is required');
  const EmailSchema = Yup.string().email('Invalid email').required('Email is required');
  const PasswordSchema = Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const handleFullnameChange = (text: string) => {
    setFullname(text);
    try {
      FullnameSchema.validateSync(text);
      setFullnameError('');
    } catch (error: any) {
      setFullnameError(error.message);
    }
  }

  const handleEmailChange = (text: string) => {
    setEmail(text);
    try {
      EmailSchema.validateSync(text);
      setEmailError('');
    } catch (error: any) {
      setEmailError(error.message);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    try {
      PasswordSchema.validateSync(text);
      setPasswordError('');
    } catch (error: any) {
      setPasswordError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      RegisterSchema.validateSync({ fullname, email, password }, { abortEarly: false });
      setFullnameError('');
      setEmailError('');
      setPasswordError('');
  
      // Register the user
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User registered: ', user);
      await AsyncStorage.setItem(StorageKey.KEY_USER_ID, user.uid);
      // bottomSheetRef.current?.expand();
      setSheetIndex(0);
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('This email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setEmailError('The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        setPasswordError('The password is not strong enough.');
      } else {
        // error is not related to Firebase Authentication (from Yup validation error)
        error.inner.forEach((err: any) => {
          if (err.path === 'fullname') {
            setFullnameError(err.message);
          } else if (err.path === 'email') {
            setEmailError(err.message);
          } else if (err.path === 'password') {
            setPasswordError(err.message);
          }
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        required
        label="Full Name"
        value={fullname}
        onChangeText={handleFullnameChange}
        placeholder="John Doe"
        error={fullnameError}
      />
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
      <CustomButton
        title="Register"
        onPress={handleRegister}
        buttonColorVariant="primary"
        buttonVariant="buttonTextIconLeft"
        buttonShape="rounded"
        iconName="person"
        iconSize={16}
      />
      <CustomBottomSheet
        ref={bottomSheetRef}
        index={sheetIndex}
        title="Registration Successful"
        desc="You have successfully registered."
        Image={DoneRegistration}
        onChange={handleSheetChanges}
        onPrimaryButtonPress={() => {
          bottomSheetRef.current?.close();
          console.log('Ok button pressed')
          navigation.navigate('Home');
        }}
        onSecondaryButtonPress={() => {
          bottomSheetRef.current?.close();
          console.log('Cancel button pressed')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default RegisterScreen;