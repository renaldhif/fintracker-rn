import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface UserData {
  email: string;
  password: string;
  fullName?: string;
}

export const register = async ({ email, password, fullName }: UserData) => {
  try {
    // Sign up the user
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store additional user information in Firestore
    await firestore().collection('Users').doc(user.uid).set({
      userId: user.uid,
      email: email,
      fullname: fullName,
    });

    console.log('User signed up and information stored in Firestore');
  } catch (error) {
    console.error('Error signing up: ', error);
  }
};

export const login = async ({ email, password }: UserData) => {
  try {
    // Sign in the user
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in: ', user);
    return userCredential;
  } catch (error) {
    console.error('Error signing in: ', error);
  }
}

export const getUserToken = async () => {
  try {
    // Get the user token
    const userToken = await auth().currentUser?.getIdToken();
    console.log('User token: ', userToken);
    return userToken;
  } catch (error) {
    console.error('Error getting user token: ', error);
  }
}

export const logout = async () => {
  try {
    // Sign out the user
    await auth().signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out: ', error);
  }
}

export const forgotPassword = async ({ email }: UserData) => {
  try {
    // Send password reset email
    await auth().sendPasswordResetEmail(email);

    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email: ', error);
  }
}