import {render, screen} from "@testing-library/react";
import ViewThreadComments from "../../../Board/Comment/ViewThreadComments";
import userEvent from "@testing-library/user-event";
import {ADD_COMMENT, CANCEL_VIEW_COMMENTS} from "../../../../modules/boardReducer";

it('should show thread title, date, and username', function () {
    const dispatch = jest.fn()
    const staticComment = 'mock'
    const state = {
        boardReducer: {
            threads: [{
                id: 4,
                title: 'title',
                date: 'date',
                username: 'user',
                comments: [
                    {id: 9, username: 'brady', body: 'comment', date: 'date0'},
                    {id: 10, username: 'other', body: 'test', date: '0'}
                ]}, {
                id: 5,
                title: 'yes',
                date: 'date66',
                username: 'brady',
                comments: [
                    {id: 15, username: 'user', body: 'comment', date: 'date0'},
                    {id: 10, username: 'admin', body: 'test', date: '0'}
                ]}],
            threadToView: 4
        }
    }
    const mockStaticComment = () => <div>{staticComment}</div>
    render(<ViewThreadComments _useDispatch={() => dispatch} _useSelector={fn => fn(state)} StaticCommentX={mockStaticComment}/>)
    expect(screen.getByText('user')).toBeInTheDocument()
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('date')).toBeInTheDocument()
});

it('should show 3 comments', function () {
    const dispatch = jest.fn()
    const state = {
        boardReducer: {
            threads: [{
                id: 4,
                title: 'title',
                date: 'date',
                username: 'user',
                comments: ['comment1' , 'comment2', 'comment3']
            }],
            threadToView: 4
        }}
    const mockStaticComment = ({staticComment}) => <div>{staticComment}</div>
    render(<ViewThreadComments _useDispatch={() => dispatch} _useSelector={fn => fn(state)} StaticCommentX={mockStaticComment}/>)
    expect(screen.getByText(state.boardReducer.threads[0].comments[0])).toBeInTheDocument()
    expect(screen.getByText(state.boardReducer.threads[0].comments[1])).toBeInTheDocument()
    expect(screen.getByText(state.boardReducer.threads[0].comments[2])).toBeInTheDocument()
});

it('should show New Comment and Back Buttons', function () {
    const dispatch = jest.fn()
    const staticComment = 'mock'
    const state = {
        boardReducer: {
            threads: [{
                id: 4,
                title: 'title',
                date: 'date',
                username: 'user',
                comments: ['comment1' , 'comment2', 'comment3']
            }],
            threadToView: 4
        }}
    const mockStaticComment = () => <div>{staticComment}</div>
    render(<ViewThreadComments _useDispatch={() => dispatch} _useSelector={fn => fn(state)} StaticCommentX={mockStaticComment}/>)
    expect(screen.getByText('New Comment')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
});

it('should dispatch CANCEL_VIEW_COMMENTS on Back click', function () {
    const dispatch = jest.fn()
    const staticComment = 'mock'
    const state = {
        boardReducer: {
            threads: [{
                id: 4,
                title: 'title',
                date: 'date',
                username: 'user',
                comments: ['comment1' , 'comment2', 'comment3']
            }],
            threadToView: 4
        }}
    const mockStaticComment = () => <div>{staticComment}</div>
    render(<ViewThreadComments _useDispatch={() => dispatch} _useSelector={fn => fn(state)} StaticCommentX={mockStaticComment}/>)
    userEvent.click(screen.getByText('Back'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_VIEW_COMMENTS})
});

it('should dispatch ADD_COMMENT on New Comment click', function () {
    const dispatch = jest.fn()
    const staticComment = 'mock'
    const state = {
        boardReducer: {
            threads: [{
                id: 4,
                title: 'title',
                date: 'date',
                username: 'user',
                comments: ['comment1' , 'comment2', 'comment3']
            }],
            threadToView: 4
        }}
    const mockStaticComment = () => <div>{staticComment}</div>
    render(<ViewThreadComments _useDispatch={() => dispatch} _useSelector={fn => fn(state)} StaticCommentX={mockStaticComment}/>)
    userEvent.click(screen.getByText('New Comment'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_COMMENT})
});