import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { CustomText } from "../components/CustomText";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Login logic
  };

  return (
    <View>
      <View>
        <CustomText fontVariant="XL">Login</CustomText>
      </View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginScreen;