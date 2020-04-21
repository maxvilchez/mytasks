import React from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {Base64} from 'js-base64';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  CenterContent,
  FormContent,
  Title,
  BPrimaryLogin,
} from '../utils/styles';
import {Form, User, userOptions} from '../config/forms';
import getRealm from '../services/realm';
import {actionSignIn} from '../actions';

export default function SignUpScreen(props) {
  const dispatch = useDispatch();
  const form = React.createRef();
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState(0);

  React.useEffect(function() {
    async function getUsers() {
      const realm = await getRealm();
      const users = realm.objects('User');
      setId(users.length);
    }
    getUsers();
  }, []);

  async function _handleSignUp() {
    try {
      const value = form.current.getValue();
      if (value) {
        const password = Base64.encode(value.password);
        const data = {
          ...value,
          password,
          id,
        };
        const realm = await getRealm();
        realm.write(function() {
          realm.create('User', data);
        });

        const storage = JSON.stringify({email: value.email});
        await AsyncStorage.setItem('@mytasks', storage);

        ToastAndroid.show(
          'You are registered successfully',
          ToastAndroid.SHORT,
        );

        dispatch(actionSignIn(true));
      } else {
        setVisible(true);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  function _onDismissSnackBar() {
    setVisible(false);
  }

  return (
    <Container>
      <CenterContent>
        <Title>Create Account</Title>
        <FormContent>
          <Form ref={form} type={User} options={userOptions} />
        </FormContent>
        <BPrimaryLogin mode="outlined" onPress={_handleSignUp}>
          Sign Up
        </BPrimaryLogin>
        <Snackbar
          visible={visible}
          onDismiss={_onDismissSnackBar}
          duration={2000}>
          Todos los campos son requeridos.
        </Snackbar>
      </CenterContent>
    </Container>
  );
}
