import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
	login: yup.string().required(),
	password: yup
		.string('Enter your password')
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});
const RegisterPage = () => {
	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {/*TODO*/},
	});

	return (
		<div>
            Registration Page
		</div>
	);
};

export default RegisterPage;