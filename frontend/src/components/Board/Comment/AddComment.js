import {useDispatch, useSelector} from "react-redux";
import {CANCEL_ADD_COMMENT, initiateAddComment, UPDATE_COMMENT} from "../../../modules/boardReducer";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";

export default function AddComment({
                                       _useSelector = useSelector,
                                       _useDispatch = useDispatch
                                   }) {
    const dispatch = _useDispatch()

    const commentToAdd = _useSelector(state => state.boardReducer.commentToAdd)
    const user = _useSelector(state => state.userReducer.loggedInUser)
    const date = new Date()

    function updateBody(body) {
        dispatch({type: UPDATE_COMMENT, payload: {...commentToAdd, body}})
    }

    function handleAdd(event) {
        event.preventDefault()
        dispatch(initiateAddComment())
    }

    function handleCancel() {
        dispatch({type: CANCEL_ADD_COMMENT})
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
                        <InputGroup.Text>Body</InputGroup.Text>
                        <Form.Control placeholder='Body' onChange={event => updateBody(event.target.value)}/>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Card.Body>
        <Row>
            <Col className={'d-flex justify-content-start'}>
                <Button onClick={handleAdd} style={{
                    backgroundColor: '#85E090',
                    color: 'black', outlineColor: '#85E090'
                }}>Add</Button>
            </Col>
            <Col className={'d-flex justify-content-end'}>
                <Button onClick={handleCancel} style={{
                    backgroundColor: '#FFC300',
                    color: 'black', outlineColor: '#FFC300'
                }}>Cancel</Button>
            </Col>
        </Row>
    </Card>
}