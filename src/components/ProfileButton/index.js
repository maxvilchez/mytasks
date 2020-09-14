import React from 'react'
import { IconButton } from 'react-native-paper'

export default function ProfileButton (props) {
  return (
    <IconButton
      icon="account-circle"
      size={28}
      onPress={() => props.navigate('Profile')}
    />
  )
}
