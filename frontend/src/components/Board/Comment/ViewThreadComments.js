import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";
import StaticComment from "./StaticComment";
import {ADD_COMMENT, CANCEL_VIEW_COMMENTS} from "../../../modules/boardReducer";

export default function ViewThreadComments({
                                               _useSelector = useSelector,
                                               StaticCommentX = StaticComment,
                                               _useDispatch = useDispatch
                                           }) {
    const dispatch = _useDispatch()

    const threadId = _useSelector(state => state.boardReducer.threadToView)
    const threads = _useSelector(state => state.boardReducer.threads)
    const thread = threads.find(element => element.id === threadId)
    const comments = threads.find(element => element.id === threadId).comments

    function handleBack() {
        dispatch({type: CANCEL_VIEW_COMMENTS})
    }

    function handleNewComment() {
        dispatch({type: ADD_COMMENT})

    }

    return <Card className="m-md-2" style={{backgroundColor: '#CCCCFF'}}>
        <Card.Header>
            <Card.Title>
                <div className={'d-flex justify-content-center'}>
                    <h2>{thread.title}</h2>
                </div>
            </Card.Title>
            <Card.Subtitle>
                <Row>
                    <Col className={'d-flex justify-content-start'}>
                        Created on: {thread.date}
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        By: {thread.username}
                    </Col>
                </Row>
            </Card.Subtitle>
        </Card.Header>
        <Card.Body>
            {comments.map(
                (staticComment, index) => <div key={index}>
                    <StaticCommentX staticComment={staticComment}/>
                </div>
            )}
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col className={'d-flex justify-content-start'}>
                    <Button onClick={handleNewComment} style={{backgroundColor: '#DAF7A6',
                        color: 'black', outlineColor: '#DAF7A6'}}>New Comment</Button>
                </Col>
                <Col className={'d-flex justify-content-end'}>
                    <Button onClick={handleBack} style={{backgroundColor: '#FFC300',
                        color: 'black', outlineColor: '#FFC300'}}>Back</Button>
                </Col>
            </Row>
        </Card.Footer>
    </Card>

}