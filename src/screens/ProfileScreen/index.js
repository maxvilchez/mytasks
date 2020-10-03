import React from 'react'
import { TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native'
import {
  Avatar,
  HelperText,
  IconButton,
  TextInput,
  Button
} from 'react-native-paper'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  Container,
  Section,
  Header,
  FullName,
  Form,
  FormControl,
  ChangePasswordText
} from './styles'
import { ProfileSchema } from '../../config/validations'
import realm from '../../services/realm'
// import { actionSignIn } from '../../actions'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [profile, setProfile] = React.useState(null)
  const [user, setUser] = React.useState(null)

  React.useLayoutEffect(() => {
    async function _removeSession() {
      try {
        await AsyncStorage.removeItem('@mytasks')
        // dispatch(actionSignIn(false))
      } catch (err) {
        console.log(err)
      }
    }

    function _logout() {
      Alert.alert(
        'MyTasks',
        '¿Seguro que quiere cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          { text: 'Si', onPress: _removeSession }
        ],
        { cancelable: false }
      )
    }
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon='logout' size={28} onPress={_logout} />
      )
    })
  }, [dispatch, navigation])

  React.useEffect(function () {
    async function getProfile() {
      try {
        const value = await AsyncStorage.getItem('@mytasks')
        const userLoggedIn = JSON.parse(value)
        if (userLoggedIn) {
          const data = realm
            .objects('Users')
            .filter(item => item.id === userLoggedIn.id)

          setUser(userLoggedIn)
          setProfile({
            fullname: data[0].fullname,
            email: data[0].email,
            age: data[0].age,
            phone: data[0].phone
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [])

  async function _handleSave(values) {
    try {
      if (values) {
        realm.write(function () {
          realm.create('Users', { id: user.id, ...values }, 'modified')
        })

        const storage = JSON.stringify({ email: values.email, id: user.id })
        await AsyncStorage.setItem('@mytasks', storage)

        if (Platform.OS === 'android') {
          ToastAndroid.show('Tus datos fueron actualizados', ToastAndroid.SHORT)
        } else {
          Alert.alert('MyTasks', 'Tus datos fueron actualizados')
        }
      }
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Section>
          <Header>
            <Avatar.Icon size={80} icon='account' />
            <FullName>{profile && profile.fullname}</FullName>
          </Header>
          <Form>
            <Formik
              enableReinitialize
              initialValues={profile || {}}
              onSubmit={_handleSave}
              validationSchema={ProfileSchema}>
              {({ handleChange, values, handleSubmit, errors, isValid }) => (
                <>
                  <FormControl>
                    <TextInput
                      name='fullname'
                      value={values.fullname}
                      label='Nombre completo'
                      mode='outlined'
                      onChangeText={handleChange('fullname')}
                    />
                    <HelperText type='error' visible>
                      {errors.fullname}
                    </HelperText>
                  </FormControl>

                  <FormControl>
                    <TextInput
                      name='email'
                      value={values.email}
                      label='Email'
                      mode='outlined'
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                    />
                    <HelperText type='error' visible>
                      {errors.email}
                    </HelperText>
                  </FormControl>

                  <FormControl>
                    <TextInput
                      name='age'
                      value={values.age}
                      label='Edad'
                      mode='outlined'
                      onChangeText={handleChange('age')}
                      keyboardType='numeric'
                      maxLength={2}
                    />
                    <HelperText type='error' visible>
                      {errors.age}
                    </HelperText>
                  </FormControl>

                  <FormControl>
                    <TextInput
                      name='phone'
                      value={values.phone}
                      label='Celular'
                      mode='outlined'
                      onChangeText={handleChange('phone')}
                      keyboardType='phone-pad'
                      maxLength={9}
                    />
                    <HelperText type='error' visible>
                      {errors.phone}
                    </HelperText>
                  </FormControl>

                  <FormControl>
                    <TouchableOpacity onPress={() => { }}>
                      <ChangePasswordText>
                        Cambiar contraseña
                      </ChangePasswordText>
                    </TouchableOpacity>
                  </FormControl>

                  <Button onPress={handleSubmit} disabled={!isValid}>
                    Guardar
                  </Button>
                </>
              )}
            </Formik>
          </Form>
        </Section>
      </KeyboardAwareScrollView>
    </Container>
  )
}

export default ProfileScreen
