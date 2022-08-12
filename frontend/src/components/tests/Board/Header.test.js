import {render, screen} from "@testing-library/react";
import Header from "../../Header";
import userEvent from "@testing-library/user-event";
import {ADD_THREAD} from "../../../modules/boardReducer";
import {LOGOUT, VIEW_MESSAGES, VIEW_USERS} from "../../../modules/userReducer";

it('should show buttons for addThread, messages, userList, and Logout', function () {
    render(<Header _useDispatch={() => {}} _useSelector={() => {}}/>)
    expect(screen.getByText('Add Thread')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Messages')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
});

it('should dispatch ADD_THREAD when Add Thread button is clicked', function () {
    const dispatch = jest.fn()
    render(<Header _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Add Thread'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD})
});

it('should dispatch LOGOUT when Logout button is clicked', function () {
    const dispatch = jest.fn()
    render(<Header _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Logout'))
    expect(dispatch).toHaveBeenCalledWith({type: LOGOUT})
});

it('should dispatch VIEW_USERS when Users button is clicked', function () {
    const dispatch = jest.fn()
    render(<Header _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Users'))
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_USERS})
});

it('should dispatch VIEW_MESSAGES when Messages button is clicked', function () {
    const dispatch = jest.fn()
    render(<Header _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Messages'))
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_MESSAGES})
});