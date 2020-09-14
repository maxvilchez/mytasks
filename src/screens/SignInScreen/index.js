import React from 'react'
import { Alert } from 'react-native'
import { HelperText, TextInput, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Formik } from 'formik'
import _ from 'lodash'
import { Base64 } from 'js-base64'

import {
  Container,
  Form,
  FormControl,
  Footer,
  Title,
  SubTitle,
  CenterContent
} from '../../config/styles'
import { SignInSchema } from '../../config/validations'
import { actionSignIn } from '../../actions'
import realm from '../../services/realm'

const SignInScreen = props => {
  const dispatch = useDispatch()

  async function _handleSignIn (values) {
    try {
      if (values) {
        const users = realm.objects('Users')

        const user = _.filter(users, u => {
          const pw = Base64.decode(u.password)
          return u.email === values.email && pw === values.password
        })

        if (user.length > 0) {
          const storage = JSON.stringify({ email: values.email, id: user[0].id })
          await AsyncStorage.setItem('@mytasks', storage)
          dispatch(actionSignIn({ signIn: true, user: user[0] }))
        } else {
          Alert.alert('MyTasks', 'Datos invalidos')
        }
      }
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  return (
    <Container>
      <CenterContent>
        <Title>Iniciar Sesión</Title>
        <SubTitle>Por favor inicie sesión para continuar</SubTitle>
        <Form>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={_handleSignIn}
            validationSchema={SignInSchema}>
            {({ handleChange, values, handleSubmit, errors, isValid }) => (
              <>
                <FormControl>
                  <TextInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    label="Email"
                    mode="outlined"
                    autoCapitalize="none"
                  />
                  <HelperText type="error" visible>
                    {errors.email}
                  </HelperText>
                </FormControl>
                <FormControl>
                  <TextInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    maxLength={8}
                    secureTextEntry
                    label="Contraseña"
                    mode="outlined"
                    keyboardType="numeric"
                  />
                  <HelperText type="error" visible>
                    {errors.password}
                  </HelperText>
                </FormControl>
                <Button onPress={handleSubmit} disabled={!isValid}>
                  Iniciar Sesión
                </Button>
              </>
            )}
          </Formik>
        </Form>
      </CenterContent>
      <Footer>
        <Button onPress={() => props.navigation.navigate('SignUp')}>
          ¿No tienes una cuenta? registrate
        </Button>
      </Footer>
    </Container>
  )
}

export default SignInScreen
