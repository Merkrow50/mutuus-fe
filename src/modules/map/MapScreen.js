import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';

export const MapScreen = ({initialLocation, finishLocation}) => {
  const [startLocation, setStartLocation] = useState(initialLocation);
  const [endLocation, setEndLocation] = useState(finishLocation);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Trate o caso em que a permissão não é concedida pelo usuário
        return;
      }

      if (!initialLocation) {
        // Obtenha a localização atual como ponto de partida
        const location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords;
        setStartLocation({latitude, longitude});
      }

      if (finishLocation) {
        setEndLocation(finishLocation);
      }

    };

    requestLocationPermission();
  }, []);

  return (

    <View style={styles.container}>
      {startLocation && (
        <MapView style={styles.map} initialRegion={{...startLocation, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}>
          <Marker coordinate={startLocation} title="Start"/>
          {finishLocation && <Marker coordinate={endLocation} title="Destiny"/>}
          {startLocation && finishLocation && <Polyline coordinates={[startLocation, endLocation]} strokeWidth={4} strokeColor="#FF0000"/>}
        </MapView>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});


