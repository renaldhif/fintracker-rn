// This file contains a selection of Firebase authentication error messages that might occur during authentication attempts. 
// It's not a comprehensive list, but covers common scenarios relevant to this app.

const firebaseErrorMessages = {
  'auth/invalid-credential': 'The provided authentication credential is incorrect, malformed, or has expired.',
  'auth/too-many-requests': 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
  'auth/email-already-in-use': 'The email address is already associated with another account.',
  'auth/invalid-email': 'The provided email address is not valid.',
  'auth/weak-password': 'The password provided is too weak. Please choose a stronger password.',
  'auth/wrong-password': 'The password provided is incorrect. Please try again.',
  'auth/user-not-found': 'No user record found for the provided email address. Please verify the email address and try again.',
};

export const getFirebaseErrorMessages = (code: any) => {
  return firebaseErrorMessages[code as keyof typeof firebaseErrorMessages] || '';
};
