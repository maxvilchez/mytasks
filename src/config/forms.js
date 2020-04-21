import t from 'tcomb-form-native';

export const Form = t.form.Form;

export const SignIn = t.struct({
  email: t.String,
  password: t.String,
});

export const signInOptions = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    password: {
      secureTextEntry: true,
      maxLength: 8,
      keyboardType: 'numeric',
    },
  },
};

export const User = t.struct({
  fullname: t.String,
  email: t.String,
  age: t.String,
  phone: t.String,
  password: t.String,
});

export const userOptions = {
  fields: {
    fullname: {
      label: 'Full Name',
      autoCapitalize: 'none',
    },
    email: {
      autoCapitalize: 'none',
    },
    age: {
      maxLength: 3,
      keyboardType: 'numeric',
    },
    phone: {
      keyboardType: 'phone-pad',
    },
    password: {
      secureTextEntry: true,
      maxLength: 8,
      keyboardType: 'numeric',
    },
  },
};
