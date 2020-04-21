import React from 'react';
import {Alert} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  BPrimaryLogin,
  FormContent,
  Footer,
  Title,
  SubTitle,
  CenterContent,
} from './../utils/styles';
import {Form, SignIn, signInOptions} from '../config/forms';
import getRealm from '../services/realm';
import {actionSignIn} from '../actions';

export default function SignInScreen(props) {
  const dispatch = useDispatch();
  const form = React.createRef();
  const [visible, setVisible] = React.useState(false);

  async function _handleSignIn() {
    try {
      const value = form.current.getValue();
      if (value) {
        const realm = await getRealm();
        const user = realm.objects('User');

        console.log(user);

        const storage = JSON.stringify({email: value.email});
        await AsyncStorage.setItem('@mytasks', storage);

        dispatch(actionSignIn(true));
      } else {
        setVisible(true);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  const _onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <Container>
      <CenterContent>
        <Title>Login</Title>
        <SubTitle>Please sign in to continue</SubTitle>
        <FormContent>
          <Form ref={form} type={SignIn} options={signInOptions} />
          <BPrimaryLogin mode="outlined" onPress={_handleSignIn}>
            Sign In
          </BPrimaryLogin>
        </FormContent>
        <Snackbar
          visible={visible}
          onDismiss={_onDismissSnackBar}
          duration={2000}>
          Todos los campos son requeridos.
        </Snackbar>
      </CenterContent>

      <Footer>
        <Button onPress={() => props.navigation.navigate('SignUp')}>
          Don't have as account? sign up
        </Button>
      </Footer>
    </Container>
  );
}
