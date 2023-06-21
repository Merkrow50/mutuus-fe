import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeTab} from "../home/HomeTab";
import {TravelTab} from "../travel/TravelTab";
import {AuthContext} from "../../../config/Contexts";
import {useContext, useEffect} from "react";
import {ProfileTab} from "../profile/ProfileTab";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function CentralTab() {

  const {me} = useContext(AuthContext);

  useEffect(() => {
    me();
  },[])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {

            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Travels':
              iconName = focused ? 'car' : 'car-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            default:
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';

          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00904E',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
      >
      <Tab.Screen name="Home" component={HomeTab}/>
      <Tab.Screen name="Travels" component={TravelTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}
