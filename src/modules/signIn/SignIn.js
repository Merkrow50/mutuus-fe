import {Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../../config/Contexts";
import {BaseButton} from "../../components/button/BaseButton";
import {BaseInputText} from "../../components/input/BaseInputText";
import {LinearGradient} from "expo-linear-gradient";

const Logo = require('../../../assets/mutuus_logo.png');

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  return (
      <LinearGradient colors={['#00765E', '#FFDF00', '#B4D100', '#00904E' , '#65BE1E', '#009C3B']} start={[0.0, 0.0]}
                      end={[3.0, 1.0]} style={{ flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo}/>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>Sign In</Text>
            <BaseInputText setValue={setEmail} value={email} placeholder="E-mail" placeholderTextColor="#ffffff" />
            <BaseInputText setValue={setPassword} value={password} placeholder="Password" placeholderTextColor="#ffffff" secureTextEntry={true}/>
            <BaseButton onPress={() => signIn({email, password})} title="Sign In"/>
          </View>
        </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    color: 'rgb(255,255,255)',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  body: {
    flex: 0.7,
    justifyContent: 'center',
    width: "100%",
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  header: {
    width: "100%",
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    width: 350,
    height: 50
  },
});
