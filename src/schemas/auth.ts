import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
});