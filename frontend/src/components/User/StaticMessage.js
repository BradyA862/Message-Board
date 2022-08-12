import {Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_MESSAGE, initiateDeleteMessage} from "../../modules/userReducer";

export default function StaticMessage({
                                          staticMessage,
                                          _useDispatch = useDispatch,
                                          _useSelector = useSelector
                                      }) {
    const dispatch = _useDispatch()

    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)
    const sender = users.find(element => element.id === staticMessage.sender)


    function handleDelete() {
        dispatch({type: DELETE_MESSAGE, payload: staticMessage})
        dispatch(initiateDeleteMessage())
    }

    if (staticMessage.receiver === loggedInUser.userId)
        return <Card className='m-2' style={{
            backgroundColor: '#ffe6cc',
            borderWidth: 2,
        }}>
            <Card.Header>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        From: {sender.username}
                    </Col>
                    <Col className={'d-flex justify-content-center'}>
                        Date: {staticMessage.date}
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Button onClick={handleDelete} size='sm' variant='outline-danger'>Delete</Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {staticMessage.body}
            </Card.Body>
        </Card>
}