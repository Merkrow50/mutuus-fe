import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {BaseHeader} from "../../../components/header/BaseHeader";
import Profile from "../../../../assets/profile_image.png"
import {Avatar, ListItem} from "react-native-elements";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../config/Contexts";
import * as SecureStore from "expo-secure-store";
import {BaseTouchbleOpacityIconItem} from "../../../components/input/BaseTouchbleOpacityIconItem";

export const ProfileTab = () => {

  const { signOut }  = useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {

    async function fetchData() {
      const response = await SecureStore.getItemAsync('user');
      console.log(response)
      setUser(JSON.parse(response));
    }

    fetchData();

  }, [])

  return (
    user && <View style={styles.container}>
      <BaseHeader
        title="Profile"
        render={
          <View style={styles.profileViewContainer}>
            <View style={styles.avatar}>
              <Avatar
                title="M"
                rounded
                size={64}
                containerStyle={{backgroundColor: '#646464'}}
              />
            </View>
            <View style={styles.userProfile}>
              <Text style={styles.userProfileText}>{`${user.firstname} ${user.lastname}`}</Text>
              <Text style={styles.userCompanyText}>{`${user.company.name}`}</Text>
            </View>
          </View>

        }/>
      <View style={{flex: 0.8, width: "100%"}}>
        <BaseTouchbleOpacityIconItem icon="logout" title="Logout" subtitle="Press to logout your Account" onPress={signOut}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  profileViewContainer: {
    flexDirection: 'row',
    width: "100%",
    height: "50%"
  },
  avatar: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userProfile: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userProfileText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  userCompanyText: {
    color: '#000000',
    fontSize: 16,
  }
});
