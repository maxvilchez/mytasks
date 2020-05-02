import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required('Please enter your password')
    .min(8, 'Password must have at least 8 characters'),
});

export const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .label('Full Name')
    .required('Please enter your full name'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a email'),
  age: Yup.string()
    .label('Age')
    .required('Please enter your age'),
  phone: Yup.string()
    .label('Phone')
    .required('Please enter your phone'),
  password: Yup.string()
    .label('Password')
    .required('Please enter a password')
    .min(8, 'Password must have at least 8 characters'),
});

export const ProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .label('Full Name')
    .required('Please enter your full name'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a email'),
  age: Yup.string()
    .label('Age')
    .required('Please enter your age'),
  phone: Yup.string()
    .label('Phone')
    .min(9, 'Phone must have at least 9 characters')
    .required('Please enter your phone'),
});
