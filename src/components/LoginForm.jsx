import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ModalActive } from '../context/use-modal';
import { User } from '../context/use-user';

export default function LoginForm() {

    const { setUserName } = useContext(User);
    const { setModalActive, setIsLoaded } = useContext(ModalActive);

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setIsLoaded(false);

        const url = "https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec?action=login&name="+values.name+"&password="+values.password;
        
        await fetch(url)
            .then(response => {
                console.log({response})
                console.log(response.status)
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання doGet з бекенду, те, що повертає return
                setIsLoaded(true);
                console.log({data});
                const regResult = JSON.parse(data);
                console.log({regResult});
                if(regResult.mystatus === 'Password is wrong') {
                    alert('Your password is invalid. Try to log in again.');
                }else if(regResult.mystatus === 'There is no user with this name') {
                    alert('There is no user with this name. Please register!');
                }else {
                    alert('Login successful!');    
                    setSubmitting(false);//isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
                    localStorage.setItem('user', JSON.stringify({name: values.name, password: values.password}));
                    const user = localStorage.getItem('user');
                    const person = JSON.parse(user);
                    setUserName(person.name);
                    navigate(`/tasks`);
                    resetForm();//скинути форму
                    setModalActive(false);
                }
            })
            .catch((error) => {
                alert(`Registration failed: ${error.message}`);
                console.log({error});
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
    });

    return (
        <>
            <Formik
            initialValues={{
            name: '',
            password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => ( //isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
                <Form>
                    <h1>Authorization</h1>
                    <div className='input__container-form'>
                        <div>
                            <label htmlFor="name">Name:</label>
                        </div>
                        <Field name="name" />
                        <ErrorMessage name="name" render={msg => <p className="error__message-form">{msg}</p>} />
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