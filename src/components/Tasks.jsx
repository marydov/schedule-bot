import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/use-user';
import { TaskList } from '../context/use-tasks';
import { Row, Col } from 'react-bootstrap';
import TaskForm from './TaskForm';
import Task from './Task';

export default function Tasks() {
    const { userName } = useContext(User);
    const { taskList } = useContext(TaskList);
    const navigate = useNavigate();

    useEffect(() => {
        if (userName === '') {
        navigate('/');
        }
    }, [navigate, userName]);

    return (
        <>
            <p>Привіт, {userName}</p>
            {/* Додати посилання на бот із закликом створити чат, натиснувши старт, після цього дописати дані на бекенд (як???) */}
            <p>Якщо Ви ще не активували чат-бота у телеграмі, перейдіть за <a href='https://t.me/mydailytodolist_bot' target="_blank" rel="noopener noreferrer">посиланням</a> і натисніть Start. Без цього ми не зможемо нагадувати Вам про Ваші щоденні справи.</p>
            <article className="task-container">
                <Row className="d-flex p-2">
                    <Col md={2}><strong>Date</strong></Col>
                    <Col md={1}><strong>Time</strong></Col>
                    <Col md={6}><strong>Task Description</strong></Col>
                    <Col md={3}></Col>
                </Row>
            </article>
            <article className="task-container">
                {taskList.map((el) => (
                <Task key={el.id} item={el} />
                ))}
            </article>
            <p><b>Додати задачу:</b></p>
            <TaskForm />
        </>
    );
}