import {useDispatch, useSelector} from "react-redux";
import {CANCEL_ADD_THREAD, initiateAddThread, UPDATE_THREAD} from "../../../modules/boardReducer";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";

export default function AddThread({
                                      _useSelector = useSelector,
                                      _useDispatch = useDispatch
                                  }) {
    const dispatch = _useDispatch()

    const threadToAdd = _useSelector(state => state.boardReducer.threadToAdd)
    const user = _useSelector(state => state.userReducer.loggedInUser)
    const date = new Date()

    function updateTitle(title) {
        dispatch({type: UPDATE_THREAD, payload: {...threadToAdd, title}})
    }

    function handleAdd(event) {
        event.preventDefault()
        dispatch(initiateAddThread())
    }

    function handleCancel() {
        dispatch({type: CANCEL_ADD_THREAD})
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
                        <InputGroup.Text>Title</InputGroup.Text>
                        <Form.Control placeholder='Title' onChange={event => updateTitle(event.target.value)}/>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Card.Body>
        <Row>
            <Col className={'d-flex justify-content-start'}>
                <Button onClick={handleAdd} style={{backgroundColor: '#85E090',
                    color: 'black', outlineColor: '#85E090'}}>Add</Button>
            </Col>
            <Col className={'d-flex justify-content-end'}>
                <Button onClick={handleCancel} style={{backgroundColor: '#FFC300',
                    color: 'black', outlineColor: '#FFC300'}}>Cancel</Button>
            </Col>
        </Row>
    </Card>

}