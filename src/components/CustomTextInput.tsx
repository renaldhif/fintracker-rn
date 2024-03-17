import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from './Colors';

interface CustomTextInputProps {
  value: string;
  type?: 'default'| 'email' | 'password' | 'number' | 'currency';
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ type, value, label, placeholder, error, required, onChangeText }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const keyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
      case 'currency':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <View style={styles.container}>
      <CustomText fontWeight='Medium' fontVariant='M' style={styles.label}>
        {label}
        {required &&
          <CustomText fontWeight='Medium' fontVariant='M' style={styles.required}> *</CustomText>
        }
      </CustomText>
      <View style={styles.textInputContainer}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            keyboardType={keyboardType()}
            secureTextEntry={type === 'password' ? !isPasswordVisible : false}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray.secondary}
          />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.icon}>
            <Icon name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {error && <CustomText style={styles.error}>{error}</CustomText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: Colors.text,
    marginBottom: 8,
  },
  required: {
    color: Colors.red.primary,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray.secondary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.text,
    fontFamily: 'AvenirNextCyr-Regular', 
    marginLeft: 8
  },
  placeholder: {
    position: 'absolute',
    left: 8,
    color: Colors.gray.secondary,
  },
  icon: {
    padding: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomTextInput;