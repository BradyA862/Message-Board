import {Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {SEND_MESSAGE, SET_RECEIVER} from "../../modules/userReducer";

export default function StaticUser({
                                       staticUser,
                                       _useDispatch = useDispatch
                                   }) {
    const dispatch = _useDispatch()

    function handleMessage() {
        dispatch({type: SET_RECEIVER, payload: staticUser.id})
        dispatch({type: SEND_MESSAGE})
    }

    return <Card className='m-2' style={{backgroundColor: '#ffe6cc'}}>
        <Card.Body>
            <Row>
                <Col className={'d-flex justify-content-start'}>
                    <h3>{staticUser.username}</h3>
                </Col>
                <Col className={'d-flex justify-content-center'}>
                    <h3>ID: {staticUser.id}</h3>
                </Col>
                <Col className={'d-flex justify-content-end'}>
                    <Button onClick={handleMessage}
                            style={{
                                backgroundColor: '#cce5ff',
                                color: 'black',
                                outlineColor: '#cce5ff'
                    }}>Send Message</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
}