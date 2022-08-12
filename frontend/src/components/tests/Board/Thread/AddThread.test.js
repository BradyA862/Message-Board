import {render, screen} from "@testing-library/react";
import AddThread from "../../../Board/Thread/AddThread";
import userEvent from "@testing-library/user-event";
import {CANCEL_ADD_THREAD} from "../../../../modules/boardReducer";

it('should show title input field', function () {
    render(<AddThread _useSelector={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()
});

it('should show Add button and call initiateAddThread when clicked', function () {
    const dispatch = jest.fn()
    render(<AddThread _useSelector={() => {}} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText("Add"))
    expect(screen.getByText("Add")).toBeInTheDocument()
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
});

it('should show Cancel button and call CANCEL_ADD_THREAD when clicked', function () {
    const dispatch = jest.fn()
    render(<AddThread _useSelector={() => {}} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText("Cancel"))
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_ADD_THREAD})
});



