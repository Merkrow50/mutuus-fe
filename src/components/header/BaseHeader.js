import {StyleSheet, Text, View} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const BaseHeader = ({render, title}) => {

  return (
    <LinearGradient colors={['#4DCD69', '#FFE954']} style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      {render}

    </LinearGradient>
  )

}

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#FFC500',
    width: "100%",
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
