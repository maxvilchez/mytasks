import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import SessionActions from './../redux/reducers/session'

import ProfileButton from './../components/ProfileButton'

import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'

import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'

const Stack = createStackNavigator()

export default function InitialScreen() {
  const dispatch = useDispatch()
  const session = useSelector(state => state.sessionReducer)

  React.useEffect(
    function () {
      function bootstrapAsync() {
        dispatch(SessionActions.signInValidate())
      }
      bootstrapAsync()
    },
    [dispatch]
  )

  if (session.isLoading) {
    return null /** SplashScreen */
  }

  return (
    <>
      <Stack.Navigator>
        {session.isSignedIn ? (
          <>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={({ navigation }) => ({
                headerRight: props => <ProfileButton {...navigation} />
              })}
            />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        ) : (
            <>
              <Stack.Screen
                name='SignIn'
                component={SignInScreen}
                options={{
                  header: () => null
                }}
              />
              <Stack.Screen
                name='SignUp'
                component={SignUpScreen}
                options={{
                  title: ''
                }}
              />
            </>
          )}
      </Stack.Navigator>
    </>
  )
}
