import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {get} from "../../http/api";
import {BaseHeader} from "../../components/header/BaseHeader";
import {MapScreen} from "../map/MapScreen";

export const CheckIn = ({route}) => {

  const [data, setData] = useState(null);

  const {id} = route.params;

  useEffect(() => {
    async function fetchData() {
      const data = await get(`/travel/${id}`);
      console.log(data)
      setData(data)
    }

    fetchData();

  }, [id])

  const formatLocation = (location) => {
    return {
      latitude: location.latitude,
      longitude: location.longitude
    }
  }

  return (
    <View style={{flex: 1}}>
      <BaseHeader
        title="Check-In"
      />
      <View style={{flex: 0.4, padding: 1, margin: 5, justifyContent: "center", backgroundColor: "#00904E"}}>
        {data && <MapScreen initialLocation={formatLocation(data.origin)} finishLocation={formatLocation(data.destiny)}/>}
      </View>
    </View>
  )
}
