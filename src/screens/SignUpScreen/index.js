import React from 'react';
import {Alert} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';
import {Base64} from 'js-base64';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Container, CenterContent, Form, FormControl, Title} from './styles';
import {SignUpSchema} from '../../config/validations';
import realm from '../../services/realm';
import {actionSignIn} from '../../actions';

export default function SignUpScreen(props) {
  const dispatch = useDispatch();
  const [id, setId] = React.useState(1);

  React.useEffect(function() {
    async function setUserId() {
      const users = realm.objects('Users');
      if (users.length > 0) {
        setId(users.length + 1);
      }
    }
    setUserId();
  }, []);

  async function _handleSignUp(values) {
    try {
      if (values) {
        const password = Base64.encode(values.password);

        const data = {
          ...values,
          password,
          id,
        };

        realm.write(function() {
          realm.create('Users', data);
        });

        const storage = JSON.stringify({email: values.email, id});
        await AsyncStorage.setItem('@mytasks', storage);

        dispatch(actionSignIn({signIn: true, user: data}));
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  return (
    <Container>
      <CenterContent>
        <Title>Crear cuenta</Title>
        <Form>
          <KeyboardAwareScrollView>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={_handleSignUp}
              validationSchema={SignUpSchema}>
              {({handleChange, values, handleSubmit, errors, isValid}) => (
                <>
                  <FormControl>
                    <TextInput
                      name="fullname"
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                      label="Nombres completos"
                      mode="outlined"
                    />
                    <HelperText type="error" visible>
                      {errors.fullname}
                    </HelperText>
                  </FormControl>

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
                      name="age"
                      value={values.age}
                      onChangeText={handleChange('age')}
                      label="Edad"
                      mode="outlined"
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <HelperText type="error" visible>
                      {errors.age}
                    </HelperText>
                  </FormControl>

                  <FormControl>
                    <TextInput
                      name="phone"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      label="Celular"
                      mode="outlined"
                      keyboardType="phone-pad"
                      maxLength={9}
                    />
                    <HelperText type="error" visible>
                      {errors.phone}
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
                    Registrarme
                  </Button>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </Form>
      </CenterContent>
    </Container>
  );
}
