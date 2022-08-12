import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {initiateLogin, REGISTER, UPDATE_CREDENTIALS} from "../../modules/userReducer";

export default function Login({
                                  _useSelector = useSelector,
                                  _useDispatch = useDispatch
                              }) {
    const dispatch = _useDispatch()

    const credentials = _useSelector(state => state.userReducer.credentials)

    function updateUsername(username) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, username}})
    }

    function updatePassword(password) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, password}})
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(initiateLogin())
    }

    function handleRegister() {
        dispatch({type: REGISTER})
    }

    return <Card style={{borderWidth: 2}}>
        <Card.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Text>
                    <div className={'d-flex justify-content-center'}>
                        <h1>Login</h1>
                    </div>
                </Form.Text>
                <Form.Group className="mb-3">
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Username</InputGroup.Text>
                        <Form.Control placeholder='username' onChange={e => updateUsername(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Password</InputGroup.Text>
                        <Form.Control placeholder='password' onChange={e => updatePassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <Row className={'p-3'}>
                    <Button type={"submit"} variant='primary'>Login</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button type='button' onClick={handleRegister}>Register</Button>
                </Row>
            </Form>
        </Card.Body>
    </Card>


}