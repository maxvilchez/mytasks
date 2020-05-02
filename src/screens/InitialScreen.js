import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import {actionSignIn, actionSessionLoading} from '../actions';

import ProfileButton from './../components/ProfileButton';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function InitialScreen() {
  const dispatch = useDispatch();
  const signIn = useSelector(state => state.signIn);

  React.useEffect(
    function() {
      async function bootstrapAsync() {
        try {
          const value = await AsyncStorage.getItem('@mytasks');
          const userLoggedIn = JSON.parse(value);
          if (userLoggedIn) {
            dispatch(actionSignIn(true));
          } else {
            dispatch(actionSessionLoading(false));
          }
        } catch (err) {
          console.log(err);
        }
      }
      bootstrapAsync();
    },
    [dispatch],
  );

  if (signIn.isLoading) {
    return null; /** SplashScreen */
  }

  return (
    <>
      <Stack.Navigator>
        {signIn.isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                headerRight: props => <ProfileButton {...navigation} />,
              })}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: '',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
