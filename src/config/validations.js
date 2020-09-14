import * as Yup from 'yup'

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Ingrese un email valido')
    .required('Por favor ingrese su email'),
  password: Yup.string()
    .label('Contraseña')
    .required('Por favor ingrese su contraseña')
    .min(8, 'La contraseña debe de tener 8 caracteres')
})

export const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .label('Nombres completos')
    .required('Por favor ingrese su nombre completo'),
  email: Yup.string()
    .label('Email')
    .email('Ingrese un email valido')
    .required('Por favor ingrese un email'),
  age: Yup.string()
    .label('Edad')
    .required('Por favor ingrese su edad'),
  phone: Yup.string()
    .label('Celular')
    .required('Por favor ingrese su celular'),
  password: Yup.string()
    .label('Password')
    .required('Por favor ingrese una contraseña')
    .min(8, 'La contraseña debe de tener 8 caracteres')
})

export const ProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .label('Nombres completos')
    .required('Por favor ingrese su nombre completo'),
  email: Yup.string()
    .label('Email')
    .email('Ingrese un email valido')
    .required('Por favor ingrese un email'),
  age: Yup.string()
    .label('Edad')
    .required('Por favor ingrese su edad'),
  phone: Yup.string()
    .label('Celular')
    .required('Por favor ingrese su celular')
})

export const NewTasksSchema = Yup.object().shape({
  description: Yup.string()
    .label('Descricción')
    .required('Por favor ingrese una descricción')
})
