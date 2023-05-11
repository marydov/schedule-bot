// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function RegistrationForm() {
//  const [name, setName] = useState('');
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        const url = 'https://script.google.com/macros/s/AKfycbzR7_MG6Tqi8Y7cdmsRGH66Ill0cPAsiBbfx7UAVtmC9K29prLCrY989dtXA5tV-VI6/exec';
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                    route: 'newClient',
                    name: values.name,
                    email: values.email,
                    password: values.password,
         })}
        
        await fetch(url, options)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання setUserData з бекенду, те, що повертає return
                console.log({data});
                const regResult = JSON.parse(data);
                console.log(regResult);
                if(regResult.mystatus === 'The user is registered') {
                    alert('You are already registered!');
                }else {
                    alert('Registration successful!');
                    setSubmitting(false);
                    navigate(`/tasks`);
                    resetForm();
                }
            })
            .catch((error) => {
                alert(`Registration failed: ${error.message}`);
                console.log('error: ' + error);
                setSubmitting(false);
            });       
    }

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Must be at least 3 characters!')
      .max(20, 'Must be 20 characters or less!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters!')
      .max(20, 'Must be 20 characters or less!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

return (
    <>
        <Formik
        initialValues={{
        name: '',
        email: '',
        password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
            <Form>
                <h1>Registration</h1>
                <div>
                    <div>
                        <label htmlFor="name">Name:</label>
                    </div>
                    <Field name="name" />
                    <ErrorMessage name="name" />
                </div>
                <div>
                    <div>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <Field name="email" />
                    <ErrorMessage name="email" />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <Field name="password" />
                    <ErrorMessage name="password" />
                </div>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
            )}
        </Formik>
    </>
)
}
