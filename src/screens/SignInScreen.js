import React from 'react';
import {Alert} from 'react-native';
import {Button, TextInput, HelperText} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';

import {
  Container,
  BPrimaryLogin,
  FormContent,
  InputContent,
  Footer,
  Title,
  SubTitle,
  CenterContent,
} from '../config/styles';
import {SignInSchema} from '../config/validations';
import {actionSignIn} from '../actions';
import getRealm from '../services/realm';

export default function SignInScreen(props) {
  const dispatch = useDispatch();

  async function _handleSignIn(values) {
    console.log(values);
    try {
      if (values) {
        const realm = await getRealm();
        const users = realm.objects('Users');

        console.log(users);

        const storage = JSON.stringify({email: values.email});
        await AsyncStorage.setItem('@mytasks', storage);

        dispatch(actionSignIn(true));
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  return (
    <Container>
      <CenterContent>
        <Title>Login</Title>
        <SubTitle>Please sign in to continue</SubTitle>
        <FormContent>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={_handleSignIn}
            validationSchema={SignInSchema}>
            {({handleChange, values, handleSubmit, errors, isValid}) => (
              <>
                <InputContent>
                  <TextInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    label="Email"
                    autoCapitalize="none"
                  />
                  <HelperText type="error" visible>
                    {errors.email}
                  </HelperText>
                </InputContent>
                <InputContent>
                  <TextInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    maxLength={8}
                    secureTextEntry
                    label="Password"
                    keyboardType="numeric"
                  />
                  <HelperText type="error" visible>
                    {errors.password}
                  </HelperText>
                </InputContent>
                <BPrimaryLogin
                  mode="outlined"
                  onPress={handleSubmit}
                  disabled={!isValid}>
                  Sign In
                </BPrimaryLogin>
              </>
            )}
          </Formik>
        </FormContent>
      </CenterContent>
      <Footer>
        <Button onPress={() => props.navigation.navigate('SignUp')}>
          Don't have as account? sign up
        </Button>
      </Footer>
    </Container>
  );
}
