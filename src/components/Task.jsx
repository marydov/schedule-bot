import { Row, Col } from 'react-bootstrap';

export default function Task({task}) {

    return (
        <>
            <article className="task-container">
                <Row className="d-flex p-2">
                    <Col md={2}>{task.taskDate}</Col>
                    <Col md={2}>{task.taskTime}</Col>
                    <Col md={5}>{task.taskDescr}</Col>
                    <Col md={1}><button className='btn__task-form'>Видалити</button></Col>
                    <Col md={2}><button className='btn__task-form'>Редагувати</button></Col>
                </Row>
            </article>
        </>
    );
}