import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/use-user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TaskList } from '../context/use-tasks';
import { getTasks } from '../utils/getTask';

export default function LoginForm() {

    const { updateUserName } = useContext(User);
    const { setTaskList } = useContext(TaskList);

    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        const url = "https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec?action=login&name="+values.name+"&password="+values.password;
        
        await fetch(url)
            .then(response => {
                console.log(response)
                console.log(response.status)
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання doGet з бекенду, те, що повертає return
                console.log({data});
                const regResult = JSON.parse(data);
                console.log(regResult);
                if(regResult.mystatus === 'Password is wrong') {
                    alert('Your password is invalid. Try to log in again.');
                }else if(regResult.mystatus === 'There is no user with this name') {
                    alert('There is no user with this name. Please register!');
                }else {
                    alert('Login successful!');    
                    setSubmitting(false);//isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
                    localStorage.setItem('user', JSON.stringify({name: values.name, password: values.password}));
                    const lsData = localStorage.getItem('user');
                    const person = JSON.parse(lsData);
                    updateUserName(person.name);
                    getTasks(person.name, setTaskList);//функція з гет-запитом на список задач
                    navigate(`/tasks`);
                    resetForm();//скинути форму
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
        .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers are allowed')//^ початок рядка $ кінець рядка [a-zA-Z0-9] регулярний вираз(всі букви, всі цифри)
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
                //можна додати className для форми, полів, помилки та прописати їм стилі (де розташувати, шрифт, колір і т.д.)
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
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
                )}
            </Formik>
        </>
    )
}