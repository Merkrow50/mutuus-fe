import {useContext} from "react";
import {Button, View, Text} from "react-native";
import {AuthContext} from "../../config/Contexts";

export function HomeScreen() {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut}/>
    </View>
  );
}
