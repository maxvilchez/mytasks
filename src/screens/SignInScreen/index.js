import React from 'react'
import { Alert } from 'react-native'
import { HelperText, TextInput, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

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
import SessionActions from './../../redux/reducers/session'

const SignInScreen = props => {
  const dispatch = useDispatch()

  const { isLoadingSession } = useSelector(state => state.sessionReducer)

  function _handleSignIn(values) {
    try {
      if (values) {
        dispatch(SessionActions.signIn(values))
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
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    label='Email'
                    mode='outlined'
                    autoCapitalize='none'
                  />
                  <HelperText type='error' visible>
                    {errors.email}
                  </HelperText>
                </FormControl>
                <FormControl>
                  <TextInput
                    name='password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    maxLength={8}
                    secureTextEntry
                    label='Contraseña'
                    mode='outlined'
                    keyboardType='numeric'
                  />
                  <HelperText type='error' visible>
                    {errors.password}
                  </HelperText>
                </FormControl>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  loading={isLoadingSession}>
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
