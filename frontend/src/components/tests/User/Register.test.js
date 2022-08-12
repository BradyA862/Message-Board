import {render, screen} from "@testing-library/react";
import Register from "../../User/Register";
import userEvent from "@testing-library/user-event";
import {CANCEL_REGISTER, UPDATE_CREDENTIALS} from "../../../modules/userReducer";

it('should show username and password fields', function () {
    render(<Register _useDispatch={() => {}} _useSelector={() => {}}/>)
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
});

it('should update username when user types in username field', function () {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            credentials: {
                username: '',
                password: ''
            }}}
    render(<Register _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    const usernameElement = screen.getByPlaceholderText('username')
    const username = "brady"
    userEvent.type(usernameElement, username)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_CREDENTIALS, payload: {username: 'brady', password: ''}})
});

it('should update password when user types in password field', function () {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            credentials: {
                username: '',
                password: ''
            }}}
    render(<Register _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    const passwordElement = screen.getByPlaceholderText('password')
    const password = "mypass"
    userEvent.type(passwordElement, password)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_CREDENTIALS, payload: {username: '', password: 'mypass'}})
});

it('should dispatch initiateRegister when user clicks Register', function () {
    const dispatch = jest.fn()
    render(<Register _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Register'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
});

it('should dispatch REGISTER when user clicks Register button', function () {
    const dispatch = jest.fn()
    render(<Register _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_REGISTER})
});