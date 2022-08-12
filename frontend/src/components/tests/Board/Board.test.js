import {render, screen} from "@testing-library/react";
import Board from "../../Board/Board";

it('should show AddThread when threadToAdd is not null', function () {
    const AddThread = 'AddThread'
    const ThreadList = 'ThreadList'
    const Header = 'Header'

    const mockAddThread = () => <div>{AddThread}</div>
    const mockThreadList = () => <div>{ThreadList}</div>
    const mockHeader = () => <div>{Header}</div>

    const state = {
        boardReducer: {
            threadToAdd: {
                title: 'title',
                date: 'date'
            },
            threadToEdit: null
        }}
    const dispatch = jest.fn();

    render(<Board _useSelector={fn => fn(state)} AddThreadX={mockAddThread} HeaderX={mockHeader} ThreadListX={mockThreadList} _useDispatch={() => dispatch}/>)
    expect(screen.getByText(AddThread)).toBeInTheDocument()
});

it('should show Header and ThreadList when threadToAdd is null', function () {
    const AddThread = 'AddThread'
    const ThreadList = 'ThreadList'
    const Header = 'Header'

    const mockAddThread = () => <div>{AddThread}</div>
    const mockThreadList = () => <div>{ThreadList}</div>
    const mockHeader = () => <div>{Header}</div>

    const state = {
        boardReducer: {
            threadToAdd: null,
            threadToEdit: null
        }}
    const dispatch = jest.fn();

    render(<Board _useSelector={fn => fn(state)} AddThreadX={mockAddThread} HeaderX={mockHeader} ThreadListX={mockThreadList} _useDispatch={() => dispatch}/>)
    expect(screen.getByText(ThreadList)).toBeInTheDocument()
    expect(screen.getByText(Header)).toBeInTheDocument()

});