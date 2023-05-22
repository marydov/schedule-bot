import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/use-user';
import { Row, Col } from 'react-bootstrap';
import TaskForm from './TaskForm';

export default function Tasks() {
    const { userName } = useContext(User);
    const navigate = useNavigate();

    useEffect(() => {
        if (userName === '') {
        navigate('/');
        }
    }, [navigate, userName]);

    return (
        <>
            <p>
                Це сторінка задач
            </p>
            <p>Привіт, {userName}</p>
            <article className="task-container">
                <Row className="d-flex p-2">
                    <Col md={2}><strong>Date</strong></Col>
                    <Col md={1}><strong>Time</strong></Col>
                    <Col md={6}><strong>Task Description</strong></Col>
                    <Col md={3}></Col>
                </Row>
            </article>
            <p><b>Додати задачу:</b></p>
            <TaskForm />
        </>
    );
}