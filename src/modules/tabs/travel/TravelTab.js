import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {BaseSpeedDial} from "../../../components/speedDial/BaseSpeedDial";
import {get} from "../../../http/api";
import {BaseTouchbleOpacityIconItem} from "../../../components/input/BaseTouchbleOpacityIconItem";
import {BaseHeader} from "../../../components/header/BaseHeader";
import * as Location from 'expo-location';
import Moment from 'moment';

const ACTIONS = [
  {
    name: "add",
    title: "New Travel",
    color: "#fff",
    onPress: () => console.log("asdasdfaf")
  }
]

export function TravelTab({navigation}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const data = await get("/travel");

      let result = [];

      for (const x of data) {

        const location = {
          latitude: x.origin.latitude,
          longitude: x.origin.longitude
        }

        let regionName = await Location.reverseGeocodeAsync(location);
        const [address] = regionName;

        result.push({
          id: x.id,
          title: `${address.district} - ${address.street} - ${address.streetNumber}`,
          subtitle: Moment(x.dateTime).format('dd/mm/yyyy hh:mm')
        })
      }

      setItems(result)
    }

    fetchData();

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <BaseHeader
        title="Travels"
        render={
          <View>
            <Text>See the open travels!</Text>
          </View>
        }/>
      <View style={{flex: 0.8}}>
        {
          <FlatList
            data={items}
            renderItem={({item}) => (
              <BaseTouchbleOpacityIconItem
                icon="navigation"
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => navigation.navigate('CheckIn', {id: item.id})}
              />
            )}
            keyExtractor={item => item.id}
          />
        }
      </View>
      <BaseSpeedDial open={open} setOpen={setOpen} actions={ACTIONS}/>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

