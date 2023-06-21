import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const BaseButton = ({onPress, title}) => {

  return <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 50,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 16,
    width: 350,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
