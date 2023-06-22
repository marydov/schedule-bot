import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/use-user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ModalActive } from '../context/use-modal';

export default function RegistrationForm() {

    const { setUserName } = useContext(User);
    const { setModalActive, setIsLoaded } = useContext(ModalActive);

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setIsLoaded(false);

        const url = 'https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec';
        
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
                console.log({response})
                console.log(response.status)
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання setUserData з бекенду, те, що повертає return
                setIsLoaded(true);
                console.log({data});
                const regResult = JSON.parse(data);
                console.log({regResult});
                if(regResult.mystatus === 'The user is registered') {
                    alert('You are already registered!');
                }else {
                    alert('Registration successful!');
                    setSubmitting(false);//isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
                    localStorage.setItem('user', JSON.stringify({name: values.name, password: values.password}));
                    const lsData = localStorage.getItem('user');
                    const person = JSON.parse(lsData);
                    setUserName(person.name);
                    navigate(`/tasks`);
                    resetForm();//скинути форму
                    setModalActive(false);
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
        .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores are allowed')//^ початок рядка $ кінець рядка [a-zA-Z0-9] регулярний вираз(всі букви, всі цифри)
        .required('Required'),
        password: Yup.string()
        .min(8, 'Must be at least 8 characters!')
        .max(20, 'Must be 20 characters or less!')
        .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')
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
                {({ isSubmitting }) => ( //isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
                //можна додати className для форми, полів, помилки та прописати їм стилі (де розташувати, шрифт, колір і т.д.)
                <Form>
                    <h1>Registration</h1>
                    <div className='input__container-form'>
                        <div>
                            <label htmlFor="name">Name:</label>
                        </div>
                        <Field name="name" />
                        <ErrorMessage name="name" render={msg => <p className="error__message-form">{msg}</p>} />
                    </div>
                    <div className='input__container-form'>
                        <div>
                            <label htmlFor="email">Email:</label>
                        </div>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" render={msg => <p className="error__message-form">{msg}</p>} />
                    </div>
                    <div className='input__container-form'>
                        <div>
                            <label htmlFor="password">Password:</label>
                        </div>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" render={msg => <p className="error__message-form">{msg}</p>} />
                    </div>
                    <button type="submit" disabled={isSubmitting} className='btn__submit'>Submit</button>
                </Form>
                )}
            </Formik>
        </>
    )
}
