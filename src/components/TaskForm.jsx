import { useContext } from 'react';
import { User } from '../context/use-user';
import { TaskList } from '../context/use-tasks';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function TaskForm() {

    const { userName } = useContext(User);
    const { taskList, setTaskList } = useContext(TaskList);

    const today = new Date();
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();
    const currentSeconds = today.getSeconds();
    const currentMilliseconds = today.getMilliseconds();
    const taskID = today.getTime();
    today.setHours(currentHours, currentMinutes, currentSeconds, currentMilliseconds);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        const url = 'https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec';
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                route: 'newTask',
                name: userName,
                dateTime: values.dateTime, 
                taskDescr: values.taskDescr,
                taskID: taskID,
                remind: values.remind,
            })
        }
        
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
                if(regResult.mystatus === 'Task created') {
                    alert('Successful task creation!');
                    const newTask = {
                        dateTime: values.dateTime, 
                        taskDescr: values.taskDescr,
                        taskID: taskID,
                        remind: values.remind,
                    };
                    const newTaskList = [...taskList, newTask];// Додаємо нову задачу до масиву даних
                    localStorage.setItem('tasks', JSON.stringify(newTaskList));// Зберігаємо оновлений масив даних в LocalStorage
                    setTaskList(newTaskList);// Оновлюємо стан компонента (стейт)
                    setSubmitting(false);
                    resetForm();
                }
            })
            .catch((error) => {
                alert(`Task creation failed: ${error.message}`);
                console.log('error: ' + error);
                setSubmitting(false);
            });       
    }

    const SignupSchema = Yup.object().shape({
        dateTime: Yup.date()
        .min(today, 'Date and time cannot be in the past')
        .required('Required'),
        taskDescr: Yup.string()
        .required('Required'),
        remind: Yup.string()
        .required('Required'),
    });

    return (
        <>
            <Formik
            initialValues={{
            dateTime: '',
            taskDescr: '',
            remind: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="task-container">
                        <Row className="d-flex p-2">
                            <Col md={3} className='input__container-form'>
                                <Field name="dateTime" type="datetime-local" />
                                <ErrorMessage name="dateTime" render={msg => <p className="error__message-form">{msg}</p>} />
                            </Col>
                            <Col md={4} className='input__container-form'>
                                <Field as="textarea" name="taskDescr" rows="1" className="taskDescr__textarea" />
                                <ErrorMessage name="taskDescr" render={msg => <p className="error__message-form">{msg}</p>} />
                            </Col>
                            <Col md={2} className='input__container-form'>
                                <Field as="select" name="remind">
                                    <option value="">Нагадувати</option>
                                    <option value="once">Одноразово</option>
                                    <option value="daily">Щоденно</option>
                                    <option value="weekly">Щотижня</option>
                                    <option value="monthly">Раз в місяць</option>
                                    <option value="annually">Щорічно</option>
                                </Field>
                                <ErrorMessage name="remind" render={msg => <p className="error__message-form">{msg}</p>} />
                            </Col>
                            <Col md={1}>
                                <button type="submit" className='btn__task-form' disabled={isSubmitting}>Додати</button>
                            </Col>
                            <Col md={2}>
                                <button type="reset" className='btn__task-form'>Видалити</button>
                            </Col>
                        </Row>                   
                    </Form>
                )}
            </Formik>
        </>
    );
}