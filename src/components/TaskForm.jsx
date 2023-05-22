import { useContext } from 'react';
import { User } from '../context/use-user';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function TaskForm() {

    const { userName } = useContext(User);

    const today = new Date();
    const currentHours = today.getHours();
    const currentMinutes = today.getMinutes();
    const currentSeconds = today.getSeconds();
    const currentMilliseconds = today.getMilliseconds();
    today.setHours(currentHours, currentMinutes, currentSeconds, currentMilliseconds);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        const url = 'https://script.google.com/macros/s/AKfycbzR7_MG6Tqi8Y7cdmsRGH66Ill0cPAsiBbfx7UAVtmC9K29prLCrY989dtXA5tV-VI6/exec';
        
        const options = {
            method: 'POST',
            body: JSON.stringify({
                    route: 'newTask',
                    name: userName,
                    dateTime: values.dateTime,
                    taskDescr: values.taskDescr,
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
                if(regResult.mystatus === 'Task created') {
                    alert('Successful task creation!');
                    //тут треба додати цю задачу до загального списку задач (в стейт)
                    setSubmitting(false);
                    resetForm();//скинути форму
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
            // time: Yup.string()
            // .required('Required'),
        taskDescr: Yup.string()
        .required('Required'),
    });

    return (
        <>
            <Formik
            initialValues={{
            dateTime: '',
            // time: '',
            taskDescr: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="task-container">
                        <Row className="d-flex p-2">
                            <Col md={2} className='input__container-form'>
                                <Field name="dateTime" type="datetime-local" />
                                <ErrorMessage name="dateTime" render={msg => <p className="error__message-form">{msg}</p>} />
                            </Col>
                            {/* <Col md={1} className='input__container-form'>
                                <Field name="time" type="time" />
                                <ErrorMessage name="time" render={msg => <p className="error__message-form">{msg}</p>} />
                            </Col> */}
                            <Col md={7} className='input__container-form'>
                                <Field as="textarea" name="taskDescr" rows="1" cols="110" />
                                <ErrorMessage name="taskDescr" render={msg => <p className="error__message-form">{msg}</p>} />
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