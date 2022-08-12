import {render, screen} from "@testing-library/react";
import EditComment from "../../../Board/Comment/EditComment";
import userEvent from "@testing-library/user-event";
import {CANCEL_EDIT_COMMENT, EDIT_COMMENT} from "../../../../modules/boardReducer";

it('should show body input field', function () {
    const state = {
        boardReducer: {
            commentToEdit: {body: 'body'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditComment _useDispatch={() => {}} _useSelector={fn => fn(state)}/>)
    expect(screen.getByTitle('Body')).toBeInTheDocument()
});

it('should show Cancel and save buttons', function () {
    const state = {
        boardReducer: {
            commentToEdit: {body: 'body', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditComment _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
});

it('should dispatch CANCEL_EDIT_COMMENT when cancel button clicked', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            commentToEdit: {body: 'body', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditComment _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_EDIT_COMMENT})
});

it('should dispatch initiateEditThread when save button clicked', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            commentToEdit: {body: 'body', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditComment _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Save'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
});

it('should dispatch EDIT_COMMENT with changes when user types in body field', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            commentToEdit: {body: ''}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditComment _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    const bodyElement = screen.getByTitle('Body')
    const body = 'new body'
    userEvent.type(bodyElement, body)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_COMMENT, payload: {body: 'new body'}})
});