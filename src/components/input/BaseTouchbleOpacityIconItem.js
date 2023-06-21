import {StyleSheet, TouchableOpacity} from "react-native";
import {Avatar, ListItem} from "react-native-elements";

export const BaseTouchbleOpacityIconItem = ({onPress, icon, title, subtitle}) => {


  return (
    <TouchableOpacity onPress={onPress}>
      <ListItem bottomDivider>
        <Avatar
          size={38}
          rounded
          icon={{
            name: icon,
            type: 'material',
            size: 26,
          }}
          containerStyle={{ backgroundColor: '#c2c2c2', flex: 0.2, justifyContent: "center"}}
        />
        <ListItem.Content style={styles.listItemContent}>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItemContent: {
    flex: 0.9,
    alignItems: "flex-end"
  },
});
