import {Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    DELETE_THREAD,
    EDIT_THREAD,
    getComments,
    initiateDeleteThread,
    VIEW_COMMENTS
} from "../../../modules/boardReducer";


export default function StaticThread({
                                         staticThread,
                                         _useDispatch = useDispatch,
                                         _useSelector = useSelector
                                     }) {
    const dispatch = _useDispatch()

    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)

    const id = staticThread.id

    function handleViewComments() {
        dispatch({type: VIEW_COMMENTS, payload: id})
        dispatch(getComments())
    }

    function handleEdit() {
        dispatch({type: EDIT_THREAD, payload: staticThread})
    }

    function handleDelete() {
        dispatch({type: DELETE_THREAD, payload: staticThread})
        dispatch(initiateDeleteThread())
    }

    if (loggedInUser.userId === staticThread.userId) {
        return <Card className="m-md-2" style={{ backgroundColor: '#CCCCFF'}}>
                <Card.Header>
                    <Card.Title>
                        <div className={'d-flex justify-content-center'}>
                            <h2>{staticThread.title}</h2>
                        </div>
                    </Card.Title>
                    <Card.Subtitle>
                        <Row>
                            <Col className={'d-flex justify-content-start'}>
                                Created on: {staticThread.date}
                            </Col>
                            <Col className={'d-flex justify-content-end'}>
                                By: {staticThread.username}
                            </Col>
                        </Row>
                    </Card.Subtitle>
                </Card.Header>
                <Card.Footer>
                    <Row>
                        <Col className={'d-flex justify-content-start'}>
                            <Button onClick={handleViewComments}
                                    style={{backgroundColor: '#E9967A',
                                        color: 'black', outlineColor: '#E9967A'}}>View Comments</Button>
                        </Col>
                        <Col className={'d-flex justify-content-center'}>
                            <Button onClick={handleEdit}
                                    style={{backgroundColor: '#85E090',
                                        color: 'black', outlineColor: '#85E090'}}>Edit</Button>
                        </Col>
                        <Col className={'d-flex justify-content-end'}>
                            <Button onClick={handleDelete} variant={"danger"}>Delete</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
    } else {
        return <Card className="m-md-2" style={{ backgroundColor: '#CCCCFF'}}>
            <Card.Header>
                <Card.Title>
                    <div className={'d-flex justify-content-center'}>
                        <h2>{staticThread.title}</h2>
                    </div>
                </Card.Title>
                <Card.Subtitle>
                    <Row>
                        <Col className={'d-flex justify-content-start'}>
                            Created on: {staticThread.date}
                        </Col>
                        <Col className={'d-flex justify-content-end'}>
                            By: {staticThread.username}
                        </Col>
                    </Row>
                </Card.Subtitle>
            </Card.Header>
            <Card.Footer>
                <Button onClick={handleViewComments}
                        style={{backgroundColor: '#E9967A',
                            color: 'black', outlineColor: '#E9967A'}}>View Comments</Button>
            </Card.Footer>
        </Card>
    }
}