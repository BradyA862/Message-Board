import {render, screen} from "@testing-library/react";
import SendMessage from "../../User/user actions/SendMessage";
import userEvent from "@testing-library/user-event";
import {CANCEL_SEND_MESSAGE, UPDATE_BODY} from "../../../modules/userReducer";

it('should show body input field', function () {
    render(<SendMessage _useDispatch={() => {}} _useSelector={() => {}}/>)
    expect(screen.getByPlaceholderText('Body')).toBeInTheDocument()
});

it('should show Send and Cancel buttons', function () {
    render(<SendMessage _useDispatch={() => {}} _useSelector={() => {}}/>)
    expect(screen.getByText('Send')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
});

it('should dispatch UPDATE_BODY with change when user types in body field', function () {
    const dispatch = jest.fn()
    const state = {userReducer:{
        messageToSend: {
            body:''
        }}}
    render(<SendMessage _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)
    const bodyElement = screen.getByPlaceholderText('Body')
    const body = 'body'
    userEvent.type(bodyElement, body)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_BODY, payload: {body: 'body'}})
});

it('should dispatch initiateSendMessage when user clicks Send button', function () {
    const dispatch = jest.fn()
    render(<SendMessage _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Send'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
});

it('should dispatch CANCEL_SEND_MESSAGE when user clicks Cancel button', function () {
    const dispatch = jest.fn()
    render(<SendMessage _useDispatch={() => dispatch} _useSelector={() => {
    }}/>)
    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_SEND_MESSAGE})
});