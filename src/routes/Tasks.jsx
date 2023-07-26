import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import TaskForm from '../components/TaskForm';
import Task from '../components/Task';
import { User } from '../context/use-user';
import { TaskList } from '../context/use-tasks';
import { getTasks } from '../utils/getTasks';

export default function Tasks() {
    const { userName, setUserName } = useContext(User);
    const { taskList, setTaskList } = useContext(TaskList);

    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorage.getItem('user');
        const person = JSON.parse(user);

        if (user) {
            setUserName(person.name);
            getTasks(person.name, setTaskList);

        } else {
            navigate('/');
        }

        const tasksData = localStorage.getItem('tasks');
        if (tasksData) {
            setTaskList(JSON.parse(tasksData));
        }
        

    }, [navigate, userName, setUserName, setTaskList]);

    return (
        <>
            <p>Привіт, {userName}</p>
            <p><strong>Важливо! </strong>Якщо Ви ще не активували чат-бота у телеграмі, перейдіть 
                за <a href='https://t.me/mydailytodolist_bot' target="_blank" rel="noopener noreferrer">посиланням</a> і 
                натисніть <b>/start</b>. 
                Без цього ми не зможемо нагадувати Вам про Ваші щоденні справи.
            </p>
            <div>Ви можете заповнити форму нижче, вибравши день і час, коли вам треба нагадати про подію,
                а також опис самої події. Далі оберіть, яким чином нам нагадати Вам про подію:
                <ul>
                    <li>один раз (для таких подій, як похід до стоматолога чи зустріч із другом)</li>
                    <li>кожного дня (якщо ви приймаєте ліки в один і той же час або тренуєтесь)</li>
                    <li>щотижня (для регулярних справ - обираєте дату першого нагадування і кожного тижня в цей день будете 
                        отримувати сповіщення)</li>
                    <li>раз на місяць (в одне й те саме число - щоб не забути оплатити рахунки, тощо)</li>
                    <li>раз на рік (щоб не забути привітати з Днем Народження маму чи найкращу(-ого) подругу/друга)</li>
                </ul>
            </div>
            <article className="task-container">
                <Row className="d-flex p-2">
                    <Col md={2}><strong>Date</strong></Col>
                    <Col md={1}><strong>Time</strong></Col>
                    <Col md={4}><strong>Task Description</strong></Col>
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