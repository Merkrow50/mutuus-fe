import {SpeedDial} from "react-native-elements";
import {useState} from "react";

export const BaseSpeedDial = ({open, setOpen, actions}) => {


  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: 'add', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      color="#00904E"
    >
      {actions.map(x => {
        return (<SpeedDial.Action
          icon={{ name: x.name, color: x.color }}
          title={x.title}
          onPress={x.onPress}
          color="#00904E"
        />)
      })}
    </SpeedDial>
  )
}
