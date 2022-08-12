import {render, screen} from "@testing-library/react";
import StaticMessage from "../../User/StaticMessage";
import userEvent from "@testing-library/user-event";
import {DELETE_MESSAGE} from "../../../modules/userReducer";

it('should show values of from, body, and date', function () {
    const mockMessage = {
        from: 'brady',
        body: 'body',
        date: 'date'
    }
    render(<StaticMessage staticMessage={mockMessage} _useDispatch={() => {}}/>)
    expect(screen.getByText('brady')).toBeInTheDocument()
    expect(screen.getByText('body')).toBeInTheDocument()
    expect(screen.getByText('date')).toBeInTheDocument()
});

it('should show Delete button and dispatch DELETE_MESSAGE when clicked', function () {
    const mockMessage = {
        from: 'brady',
        body: 'body',
        date: 'date'
    }
    const dispatch = jest.fn()
    render(<StaticMessage staticMessage={mockMessage} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Delete'))
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_MESSAGE, payload: mockMessage})
});