import React from 'react';
import {Alert, ToastAndroid, Platform} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {Base64} from 'js-base64';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Container,
  CenterContent,
  FormContent,
  InputContent,
  Title,
  BPrimaryLogin,
} from '../config/styles';
import {SignUpSchema} from '../config/validations';
import getRealm from '../services/realm';
import {actionSignIn} from '../actions';

export default function SignUpScreen(props) {
  const dispatch = useDispatch();
  const [id, setId] = React.useState(1);

  React.useEffect(function() {
    async function getUsers() {
      const realm = await getRealm();
      const users = realm.objects('Users');
      if (users.length > 0) {
        setId(users.length + 1);
      }
    }
    getUsers();
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
        console.log(data);
        const realm = await getRealm();
        realm.write(function() {
          realm.create('Users', data);
        });

        const storage = JSON.stringify({email: values.email, id});
        await AsyncStorage.setItem('@mytasks', storage);

        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'You are registered successfully',
            ToastAndroid.SHORT,
          );
        } else {
          Alert.alert('MyTasks', 'You are registered successfully');
        }

        dispatch(actionSignIn(true));
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  return (
    <Container>
      <CenterContent>
        <Title>Create Account</Title>
        <FormContent>
          <KeyboardAwareScrollView>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={_handleSignUp}
              validationSchema={SignUpSchema}>
              {({handleChange, values, handleSubmit, errors, isValid}) => (
                <>
                  <InputContent>
                    <TextInput
                      name="fullname"
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                      label="Full Name"
                    />
                    <HelperText type="error" visible>
                      {errors.fullname}
                    </HelperText>
                  </InputContent>

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
                      name="age"
                      value={values.age}
                      onChangeText={handleChange('age')}
                      label="Age"
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    <HelperText type="error" visible>
                      {errors.age}
                    </HelperText>
                  </InputContent>

                  <InputContent>
                    <TextInput
                      name="phone"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      label="Phone"
                      keyboardType="phone-pad"
                      maxLength={9}
                    />
                    <HelperText type="error" visible>
                      {errors.phone}
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
                    Sign Up
                  </BPrimaryLogin>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </FormContent>
      </CenterContent>
    </Container>
  );
}
