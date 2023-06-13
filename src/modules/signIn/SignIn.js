import {Button, TextInput, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../../config/Contexts";

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ email, password })} />
    </View>
  );
}
