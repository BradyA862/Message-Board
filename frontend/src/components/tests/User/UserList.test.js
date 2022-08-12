import {render, screen} from "@testing-library/react";
import UserList from "../../User/user actions/UserList";
import userEvent from "@testing-library/user-event";
import {CANCEL_VIEW_USERS} from "../../../modules/userReducer";

it('should show 3 users', function () {
    const state = {
        userReducer: {
            users: [
                {username: 'brady', password: 'mypass', id: 1},
                {username: 'user', password: 'password', id: 2},
                {username: '3', password: '3', id: 3}
            ]}}
    const mockUser = ({staticUser}) => <div>{staticUser.id}</div>
    render(<UserList _useSelector={fn => fn(state)} _useDispatch={() => {}} StaticUserX={mockUser}/>)
    expect(screen.getByText(state.userReducer.users[0].id)).toBeInTheDocument()
    expect(screen.getByText(state.userReducer.users[1].id)).toBeInTheDocument()
    expect(screen.getByText(state.userReducer.users[2].id)).toBeInTheDocument()
});

it('should show Back button and dispatch CANCEL_VIEW_USERS when clicked', function () {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            users: [
                {username: 'brady', password: 'mypass', id: 1},
                {username: 'user', password: 'password', id: 2},
                {username: '3', password: '3', id: 3}
            ]}}
    const mockUser = ({staticUser}) => <div>{staticUser.id}</div>
    render(<UserList _useSelector={fn => fn(state)} StaticUserX={mockUser} _useDispatch={() => dispatch}/>)
    expect(screen.getByText('Back')).toBeInTheDocument()
    userEvent.click(screen.getByText('Back'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_VIEW_USERS})

});