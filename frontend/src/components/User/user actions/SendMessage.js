import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {CANCEL_SEND_MESSAGE, initiateSendMessage, UPDATE_BODY} from "../../../modules/userReducer";

export default function SendMessage({
                                        _useSelector = useSelector,
                                        _useDispatch = useDispatch
                                    }) {
    const dispatch = _useDispatch()

    const messageToSend = _useSelector(state => state.userReducer.messageToSend)
    const user = _useSelector(state => state.userReducer.loggedInUser)
    const date = new Date()


    function setBody(body) {
        dispatch({type: UPDATE_BODY, payload: {...messageToSend, body}})
    }

    function handleCancel() {
        dispatch({type: CANCEL_SEND_MESSAGE})
    }

    function handleSend() {
        dispatch(initiateSendMessage())
    }

    return <Card style={{borderWidth: 2, borderColor: 'black', backgroundColor: '#CCCCFF'}}>
        <Card.Header>
            <div>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        Username: {user.username}
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        Date: {date.toDateString()}
                    </Col>
                </Row>
            </div>
        </Card.Header>
        <Card.Body>
            <Form>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Text>Send Message</InputGroup.Text>
                        <Form.Control placeholder='Body' onChange={event => setBody(event.target.value)}/>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Card.Body>
        <Row>
            <Col className={'d-flex justify-content-start'}>
                <Button onClick={handleSend} style={{backgroundColor: '#85E090',
                    color: 'black', outlineColor: '#85E090'}}>
                    Send
                </Button>
            </Col>
            <Col className={'d-flex justify-content-end'}>
                <Button onClick={handleCancel} style={{backgroundColor: '#FFC300',
                    color: 'black', outlineColor: '#FFC300'}}>Cancel</Button>
            </Col>
        </Row>


    </Card>

}