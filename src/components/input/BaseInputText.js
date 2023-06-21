import {StyleSheet, TextInput, View} from "react-native";

export const BaseInputText = ({value, setValue, placeholder, placeholderTextColor, secureTextEntry}) => {

  return <View>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
    />
  </View>
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
    borderColor: '#ffffff',
    borderWidth: 1,
    fontSize: 16,
    width: 350,
  }
});
