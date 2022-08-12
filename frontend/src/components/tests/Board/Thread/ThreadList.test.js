import {render, screen} from "@testing-library/react";
import ThreadList from "../../../Board/Thread/ThreadList";

it('should show 3 threads', function () {
    const state = {
        boardReducer: {
            threads: [
                {title: 'thread 1', date: '1-1-2001', comments:[]},
                {title: 'thread 2', date: '1-2-2001', comments:[]},
                {title: 'thread 3', date: '1-1-1989', comments:[]},
            ]}}
    const mockThread = ({staticThread}) => <div>{staticThread.title}</div>
    render(<ThreadList _useSelector={fn => fn(state)} StaticThreadX={mockThread} _useDispatch={() => {}}/>)
    expect(screen.getByText(state.boardReducer.threads[0].title)).toBeInTheDocument()
    expect(screen.getByText(state.boardReducer.threads[1].title)).toBeInTheDocument()
    expect(screen.getByText(state.boardReducer.threads[2].title)).toBeInTheDocument()
});