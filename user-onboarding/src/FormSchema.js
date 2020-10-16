import * as yup from 'yup';

export default yup.object().shape({
first_name: yup.string()
.required('username is required')
.min(5, 'username must be 5 characters'),

email: yup.string()
.email('must be a valid email address')
.required('email is required'),

last_name: yup
.string()
.required('password is required')
.min(6, 'password must be 6 characters'),

terms: yup
.boolean()
.oneOf([true], 'You must accept Terms and Conditions')




});