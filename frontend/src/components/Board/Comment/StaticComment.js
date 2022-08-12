import {Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    DELETE_COMMENT,
    EDIT_COMMENT, getComments, getThreadList,
    initiateDeleteComment,
} from "../../../modules/boardReducer";
import {useEffect} from "react";

export default function StaticComment({
                                          staticComment,
                                          _useSelector = useSelector,
                                          _useDispatch = useDispatch
                                      }) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)

    function handleEdit() {
        dispatch({type: EDIT_COMMENT, payload: staticComment})
    }

    function handleDelete() {
        dispatch({type: DELETE_COMMENT, payload: staticComment})
        dispatch(initiateDeleteComment())
    }

    useEffect(() => {
        dispatch(getThreadList())
        dispatch(getComments())
    })

    if (loggedInUser.userId === staticComment.userId) {
        return <Card className="m-2" style={{
            borderWidth: 1, borderColor: 'black',
            backgroundColor: '#FFE6CC'
        }}>
            <Card.Header>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        {staticComment.username}
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        {staticComment.date}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {staticComment.body}
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        <Button onClick={handleEdit} style={{
                            backgroundColor: '#85E090',
                            color: 'black', outlineColor: '#85E090'
                        }} size='sm'>Edit</Button>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Button onClick={handleDelete} variant={"danger"} size='sm'>Delete</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>

    } else {

        return <Card className="m-2" style={{
            borderWidth: 1, borderColor: 'black',
            backgroundColor: '#FFE6CC'
        }}>
            <Card.Header>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        {staticComment.username}
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        {staticComment.date}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                {staticComment.body}
            </Card.Body>
        </Card>
    }


}