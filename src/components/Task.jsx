import { Row, Col } from 'react-bootstrap';
import moment from 'moment/moment';

export default function Task({item}) {

    const curDate = moment(item.dateTime).format('Do MMMM YYYY');
    const curTime = moment(item.dateTime).format('h:mm:ss a');

    return (
        <>
            <Row className="d-flex p-2">
                <Col md={2}>{curDate}</Col>
                <Col md={1}>{curTime}</Col>
                <Col md={5}>{item.taskDescr}</Col>
                <Col md={2}>{item.remind}</Col>
                <Col md={1}><button className='btn__task-form'>Видалити</button></Col>
                <Col md={1}><button className='btn__task-form'>Редагувати</button></Col>
            </Row>
        </>
    );
}