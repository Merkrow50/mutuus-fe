import * as React from "react";
import {useEffect, useMemo, useReducer, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from "./src/modules/signIn/SignIn";
import {SplashComponent} from "./src/components/splash/SplashComponent";
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from "./src/config/Contexts";
import {post, get} from './src/http/api';
import {CentralTab} from "./src/modules/tabs/tab/CentralTab";

const Stack = createNativeStackNavigator();

export default function App({navigation}) {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');

      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      me: async (data) => {
        try {
          const user = await get("/user/me")
          console.log(user)
          await SecureStore.setItemAsync('user', JSON.stringify(user));
        } catch (e) {
          console.error(e)
        }
      },
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let token;

        try {

          token = await post("/auth/authenticate", data);

          await SecureStore.setItemAsync('userToken', JSON.stringify(token));

        } catch (e) {
          console.error(e)
        }

        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({type: 'SIGN_OUT'})
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let token;
        try {
          token = await post("/auth/authenticate", data);
          await SecureStore.setItemAsync('userToken', JSON.stringify(token));

        } catch (e) {
          console.error(e)
        }

        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashComponent}/>
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Tabs" component={CentralTab}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
