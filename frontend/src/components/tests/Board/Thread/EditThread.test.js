import {render, screen} from "@testing-library/react";
import EditThread from "../../../Board/Thread/EditThread";
import userEvent from "@testing-library/user-event";
import {CANCEL_EDIT_THREAD, EDIT_THREAD} from "../../../../modules/boardReducer";

it('should show title input field', function () {
    const state = {
        boardReducer: {
            threadToEdit: {title: 'title', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditThread _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.getByTitle('Title')).toBeInTheDocument()
});

it('should show Cancel and save buttons', function () {
    const state = {
        boardReducer: {
            threadToEdit: {title: 'title', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditThread _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
});

it('should dispatch CANCEL_EDIT_THREAD when cancel button clicked', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            threadToEdit: {title: 'title', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditThread _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Cancel'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_EDIT_THREAD})
});

it('should dispatch initiateEditThread when save button clicked', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            threadToEdit: {title: 'title', username: 'user', date: 'date'}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditThread _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Save'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
});

it('should dispatch EDIT_THREAD with changes when user types in input field', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            threadToEdit: {title: ''}},
        userReducer: {
            loggedInUser: {username: 'user', token: 'token'}
        }}
    render(<EditThread _useSelector={fn => fn(state)} _useDispatch={() => dispatch}/>)
    const titleElement = screen.getByTitle('Title')
    const title = 'new title'
    userEvent.type(titleElement, title)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD, payload: {title: 'new title'}})
});