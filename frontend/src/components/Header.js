import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LOGOUT, VIEW_MESSAGES, VIEW_USERS} from "../modules/userReducer";
import {ADD_THREAD} from "../modules/boardReducer";

export default function Header({
                                   _useSelector = useSelector,
                                   _useDispatch = useDispatch
                               }) {
    const dispatch = _useDispatch()

    function handleAddThread() {
        dispatch({type: ADD_THREAD})
    }

    function handleUsers() {
        dispatch({type: VIEW_USERS})
    }

    function handleMessages() {
        dispatch({type: VIEW_MESSAGES})
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Message Board</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={handleAddThread}>Add Thread</Nav.Link>
                        <Nav.Link onClick={handleUsers}>Users</Nav.Link>
                        <Nav.Link onClick={handleMessages}>Messages</Nav.Link>
                    </Nav>
                    <Button title='Logout' onClick={() => dispatch({type: LOGOUT})} variant={"outline-danger"}>
                        Logout
                    </Button>
                </Container>
            </Navbar>
        </>
    )
}