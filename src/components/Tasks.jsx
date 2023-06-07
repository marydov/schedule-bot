import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/use-user';
import { TaskList } from '../context/use-tasks';
import { Row, Col } from 'react-bootstrap';
import TaskForm from './TaskForm';
import Task from './Task';

export default function Tasks() {
    const { userName } = useContext(User);
    const { taskList, setTaskList } = useContext(TaskList);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            console.log(user);
            setIsLoggedIn(true);
        }
        if (userName === '' && !isLoggedIn) {
            console.log(user);
        navigate('/');
        }
        const tasksData = localStorage.getItem('tasks');
        if (tasksData) {
            setTaskList(JSON.parse(tasksData));
        }
    }, [navigate, userName, isLoggedIn, setTaskList]);

    return (
        <>
            <p>Привіт, {userName}</p>
            <p>Якщо Ви ще не активували чат-бота у телеграмі, перейдіть за <a href='https://t.me/mydailytodolist_bot' target="_blank" rel="noopener noreferrer">посиланням</a> і натисніть <b>/start</b>. Без цього ми не зможемо нагадувати Вам про Ваші щоденні справи.</p>
            <article className="task-container">
                <Row className="d-flex p-2">
                    <Col md={2}><strong>Date</strong></Col>
                    <Col md={1}><strong>Time</strong></Col>
                    <Col md={5}><strong>Task Description</strong></Col>
                    <Col md={2}><strong>Remind</strong></Col>
                    <Col md={2}></Col>
                </Row>
            </article>
            <article className="task-container">
                {taskList.map((el) => (
                <Task item={el} key={el.taskID} />
                ))}
            </article>
            <p><b>Додати задачу:</b></p>
            <TaskForm />
        </>
    );
}