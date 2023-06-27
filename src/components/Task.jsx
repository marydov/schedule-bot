import { Row, Col } from 'react-bootstrap';
import moment from 'moment/moment';
import { useContext } from 'react';
import { TaskList } from '../context/use-tasks';
import { ModalActive } from "../context/use-modal";

export default function Task({item}) {

    const { taskList, setTaskList } = useContext(TaskList);
    const { setIsLoaded } = useContext(ModalActive);

    const curDate = moment(item.dateTime).format('Do MMMM YYYY');
    const curTime = moment(item.dateTime).format('h:mm:ss a');

    const handleDeleteTask = async (event) => {
        if(!window.confirm('Are you sure to delete this task?')) return;
        setIsLoaded(false);
        const btnTaskID = event.currentTarget.id;
        console.log('Клікнуто на кнопку з id:', event.currentTarget.id);//це айдішнік задачі на кнопці

        const url = "https://script.google.com/macros/s/AKfycbynBQ-c3MRh9QPe9rwd8JIKzK6jIInknIWQWkMLP4GaGGaNz8uzADVJ3aCzWCxSgYMC/exec?action=deleteTask&taskID="+event.currentTarget.id;

        await fetch(url)
            .then(response => {
                console.log(response.status);
                if(!response.ok) throw new Error(response.status);
                else {
                    return response.text();
                }
            })
            .then((data) => { //data - результат виконання doGet з бекенду, те, що повертає return
                setIsLoaded(true);
                console.log({data});
                const regResult = JSON.parse(data);
                    alert(regResult.mystatus);
                    console.log(btnTaskID);
                const newTaskList = taskList.filter((task) => task.taskID.toString() !== btnTaskID.toString());
                console.log({newTaskList});

                localStorage.setItem('tasks', JSON.stringify(newTaskList));
                    const tasksData = localStorage.getItem('tasks');
                    const curTasks = JSON.parse(tasksData);
                    setTaskList(curTasks);
            })
            .catch((error) => {
                alert(error.message);
                console.log({error});
            });
    }

    return (
        <>
            <Row className="d-flex p-2">
                <Col md={2}>{curDate}</Col>
                <Col md={1}>{curTime}</Col>
                <Col md={4}>{item.taskDescr}</Col>
                <Col md={2}>{item.remind}</Col>
                <Col md={1}></Col>
                <Col md={2}><button className='btn__task-form' id={item.taskID} onClick={handleDeleteTask}>Видалити</button></Col>
            </Row>
        </>
    );
}

