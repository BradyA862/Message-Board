import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {CANCEL_EDIT_COMMENT, EDIT_COMMENT, initiateEditComment} from "../../../modules/boardReducer";

export default function EditComment({
                                        _useSelector = useSelector,
                                        _useDispatch = useDispatch
                                    }) {
    const dispatch = _useDispatch()

    // const thread = _useSelector(state => state.threadToView)
    const comment = _useSelector(state => state.boardReducer.commentToEdit)
    const date = new Date()
    const user = _useSelector(state => state.userReducer.loggedInUser)


    function setBody(change) {
        dispatch({type: EDIT_COMMENT, payload: change})
    }

    function handleSave() {
        dispatch(initiateEditComment())
    }

    function handleCancel() {
        dispatch({type: CANCEL_EDIT_COMMENT})
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
                        <Form.Control type='text' defaultValue={comment.body} title='Body'
                                      onChange={event => setBody({
                                          ...comment,
                                          body: event.target.value
                                      })}/>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Card.Body>
        <Row>
            <Col className={'d-flex justify-content-start'}>
                <Button onClick={handleSave} style={{backgroundColor: '#85E090',
                    color: 'black', outlineColor: '#85E090'}}>Save</Button>
            </Col>
            <Col className={'d-flex justify-content-end'}>
                <Button onClick={handleCancel} style={{backgroundColor: '#FFC300',
                    color: 'black', outlineColor: '#FFC300'}}>Cancel</Button>
            </Col>
        </Row>
    </Card>

}