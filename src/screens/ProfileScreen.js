import React from 'react';
import {TouchableOpacity, Alert, Platform, ToastAndroid} from 'react-native';
import {Avatar, TextInput, HelperText, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Container,
  Section,
  HeaderProfile,
  FullNmae,
  FormContent,
  InputContent,
  ChangePasswordText,
  BPrimary,
} from './../config/styles';
import {ProfileSchema} from '../config/validations';
import getRealm from '../services/realm';
import {actionSignIn} from '../actions';

function ProfileScreen(props) {
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useLayoutEffect(() => {
    async function _removeSession() {
      try {
        await AsyncStorage.removeItem('@mytasks');
        dispatch(actionSignIn(false));
      } catch (err) {
        console.log(err);
      }
    }

    function _logout() {
      Alert.alert(
        'MyTasks',
        "¿I'm sure you want to log out?",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Yes', onPress: _removeSession},
        ],
        {cancelable: false},
      );
    }
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton icon="logout" size={28} onPress={_logout} />
      ),
    });
  }, [dispatch, props]);

  React.useEffect(function() {
    async function getProfile() {
      try {
        const value = await AsyncStorage.getItem('@mytasks');
        const userLoggedIn = JSON.parse(value);
        if (userLoggedIn) {
          const realm = await getRealm();

          const data = realm
            .objects('Users')
            .filter(item => item.id === userLoggedIn.id);

          setUser(userLoggedIn);
          setProfile({
            fullname: data[0].fullname,
            email: data[0].email,
            age: data[0].age,
            phone: data[0].phone,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, []);

  async function _handleSave(values) {
    try {
      if (values) {
        const realm = await getRealm();
        realm.write(function() {
          realm.create('Users', {id: user.id, ...values}, 'modified');
        });

        const storage = JSON.stringify({email: values.email, id: user.id});
        await AsyncStorage.setItem('@mytasks', storage);

        if (Platform.OS === 'android') {
          ToastAndroid.show(
            'You are registered successfully',
            ToastAndroid.SHORT,
          );
        } else {
          Alert.alert('MyTasks', 'Your data was updates');
        }
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Section>
          <HeaderProfile>
            <Avatar.Icon size={80} icon="account" />
            <FullNmae>{profile && profile.fullname}</FullNmae>
          </HeaderProfile>
          <FormContent>
            <Formik
              enableReinitialize
              initialValues={profile ? profile : {}}
              onSubmit={_handleSave}
              validationSchema={ProfileSchema}>
              {({handleChange, values, handleSubmit, errors, isValid}) => (
                <>
                  <InputContent>
                    <TextInput
                      name="fullname"
                      value={values.fullname}
                      label="Full Name"
                      onChangeText={handleChange('fullname')}
                    />
                    <HelperText type="error" visible>
                      {errors.fullname}
                    </HelperText>
                  </InputContent>

                  <InputContent>
                    <TextInput
                      name="email"
                      value={values.email}
                      label="Email"
                      onChangeText={handleChange('email')}
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
                      label="Age"
                      onChangeText={handleChange('age')}
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
                      label="Phone"
                      onChangeText={handleChange('phone')}
                      keyboardType="phone-pad"
                      maxLength={9}
                    />
                    <HelperText type="error" visible>
                      {errors.phone}
                    </HelperText>
                  </InputContent>

                  <InputContent>
                    <TouchableOpacity onPress={() => {}}>
                      <ChangePasswordText>Change Password</ChangePasswordText>
                    </TouchableOpacity>
                  </InputContent>
                  <BPrimary onPress={handleSubmit} disabled={!isValid}>
                    Save
                  </BPrimary>
                </>
              )}
            </Formik>
          </FormContent>
        </Section>
      </KeyboardAwareScrollView>
    </Container>
  );
}

export default ProfileScreen;
