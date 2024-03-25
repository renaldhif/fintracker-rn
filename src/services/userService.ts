import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageKey from '../utils/StorageKey';

export const getUserId = async () => {
  try {
    const user = await AsyncStorage.getItem(StorageKey.KEY_USER);
    if (user) {
      const userObject = JSON.parse(user);
      return userObject.uid;
    }
  } catch (error) {
    console.error('Error getting user ID: ', error);
  }
}

export const getUserData = async (userId: string) => {
  try {
    const userQuerySnapshot = await firestore().collection('Users').where('userId', '==', userId).get();
    if (!userQuerySnapshot.empty) {
      const userData = userQuerySnapshot.docs[0].data();
      // Exclude userId from the user data
      if (userData) {
        delete userData.userId;
      }
      return userData;
    }
  } catch (error) {
    console.error('Error fetching user data: ', error);
  }
}