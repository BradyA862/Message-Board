/** INITIAL STATE **/

import boardReducer, {
    ADD_THREAD_FAILURE,
    ADD_THREAD_START,
    ADD_THREAD_SUCCESS,
    getThreadList,
    initiateAddThread,
    THREAD_LIST_START,
    THREAD_LIST_FAILURE,
    THREAD_LIST_SUCCESS,
    GET_COMMENTS_START,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    VIEW_COMMENTS,
    getComments,
    CANCEL_VIEW_COMMENTS,
    ADD_COMMENT,
    ADD_COMMENT_START,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    initiateAddComment,
    EDIT_THREAD,
    DELETE_THREAD,
    EDIT_THREAD_START,
    EDIT_THREAD_SUCCESS,
    EDIT_THREAD_FAILURE,
    initiateEditThread,
    CANCEL_EDIT_THREAD,
    DELETE_THREAD_START,
    DELETE_THREAD_SUCCESS,
    DELETE_THREAD_FAILURE,
    initiateDeleteThread,
    EDIT_COMMENT_START,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    DELETE_COMMENT_START,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    initiateDeleteComment, initiateEditComment, CANCEL_ADD_COMMENT
} from "./boardReducer";


it('should start with addThreadPending false', function () {
    const state = boardReducer()
    expect(state.addThreadPending).toBe(false)
});

it('should start with deleteThreadPending false', function () {
    const state = boardReducer()
    expect(state.deleteThreadPending).toBe(false)
});

it('should start with editThreadPending false', function () {
    const state = boardReducer()
    expect(state.editThreadPending).toBe(false)
});

it('should start with threads empty', function () {
    const state = boardReducer()
    expect(state.threads.length).toBe(0)
});

it('should start with threadComments empty', function () {
    const state = boardReducer()
    expect(state.threadComments.length).toBe(0)
});

it('should start with threadToAdd null', function () {
    const state = boardReducer()
    expect(state.threadToAdd).toBeNull()
});

it('should start with threadToDelete null', function () {
    const state = boardReducer()
    expect(state.threadToDelete).toBeNull()
});

it('should start with commentToAdd null', function () {
    const state = boardReducer()
    expect(state.commentToAdd).toBeNull()
});

it('should start with threadToEdit null', function () {
    const state = boardReducer()
    expect(state.threadToEdit).toBeNull()
});

it('should start with threadListPending false', function () {
    const state = boardReducer()
    expect(state.threadListPending).toBe(false)
});

it('should start with addCommentPending false', function () {
    const state = boardReducer()
    expect(state.addCommentPending).toBe(false)
});

it('should start with threadToView null', function () {
    const state = boardReducer()
    expect(state.threadToView).toBeNull()
});

it('should start with commentsPending false', function () {
    const state = boardReducer()
    expect(state.commentsPending).toBe(false)
});

it('should start with commentToEdit null', function () {
    const state = boardReducer()
    expect(state.commentToEdit).toBeNull()
});

it('should start with deleteCommentPending false', function () {
    const state = boardReducer()
    expect(state.deleteCommentPending).toBe(false)
});

it('should start with commentToDelete null', function () {
    const state = boardReducer()
    expect(state.commentToDelete).toBeNull()
});

it('should start with editCommentPending false', function () {
    const state = boardReducer()
    expect(state.editCommentPending).toBe(false)
});

/** SWITCH **/

it('should set addThreadPending true on ADD_THREAD_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: ADD_THREAD_START})
    expect(state.addThreadPending).toBe(true)
});

it('should set addThreadPending false on ADD_THREAD_SUCCESS', function () {
    const initialState = {
        addThreadPending: true
    }
    const state = boardReducer(initialState, {type: ADD_THREAD_SUCCESS})
    expect(state.addThreadPending).toBe(false)
});

it('should set addThreadPending false on ADD_THREAD_FAILURE', function () {
    const initialState = {
        addThreadPending: true
    }
    const state = boardReducer(initialState, {type: ADD_THREAD_FAILURE})
    expect(state.addThreadPending).toBe(false)
});

it('should set listPending true on THREAD_LIST_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: THREAD_LIST_START})
    expect(state.listPending).toBe(true)
});

it('should set listPending to false on THREAD_LIST_FAILURE', function () {
    const initialState = {
        listPending: true
    }
    const state = boardReducer(initialState, {type: THREAD_LIST_FAILURE})
    expect(state.listPending).toBe(false)
});

it('should set listPending to false on THREAD_LIST_SUCCESS', function () {
    const initialState = {
        listPending: true
    }
    const state = boardReducer(initialState, {type: THREAD_LIST_SUCCESS})
    expect(state.listPending).toBe(false)
});

it('should set commentsPending true on GET_COMMENTS_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: GET_COMMENTS_START})
    expect(state.commentsPending).toBe(true)
});

it('should set commentsPending false on GET_COMMENTS_SUCCESS', function () {
    const initialState = {
        commentsPending: true
    }
    const state = boardReducer(initialState, {type: GET_COMMENTS_SUCCESS})
    expect(state.commentsPending).toBe(false)
});

it('should set commentsPending false on GET_COMMENTS_FAILURE', function () {
    const initialState = {
        commentsPending: true
    }
    const state = boardReducer(initialState, {type: GET_COMMENTS_FAILURE})
    expect(state.commentsPending).toBe(false)
});

it('should set editThreadPending true on EDIT_THREAD_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: EDIT_THREAD_START})
    expect(state.editThreadPending).toBe(true)
});

it('should set commentsPending false on EDIT_THREAD_SUCCESS', function () {
    const initialState = {
        editThreadPending: true
    }
    const state = boardReducer(initialState, {type: EDIT_THREAD_SUCCESS})
    expect(state.editThreadPending).toBe(false)
});

it('should set editThreadPending false on EDIT_THREAD_FAILURE', function () {
    const initialState = {
        editThreadPending: true
    }
    const state = boardReducer(initialState, {type: EDIT_THREAD_FAILURE})
    expect(state.editThreadPending).toBe(false)
});

it('should set editCommentPending true on EDIT_COMMENT_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: EDIT_COMMENT_START})
    expect(state.editCommentPending).toBe(true)
});

it('should set editCommentPending false on EDIT_COMMENT_SUCCESS', function () {
    const initialState = {
        editCommentPending: true
    }
    const state = boardReducer(initialState, {type: EDIT_COMMENT_SUCCESS})
    expect(state.editCommentPending).toBe(false)
});

it('should set editCommentPending false on EDIT_COMMENT_FAILURE', function () {
    const initialState = {
        editCommentPending: true
    }
    const state = boardReducer(initialState, {type: EDIT_COMMENT_FAILURE})
    expect(state.editCommentPending).toBe(false)
});

it('should set deleteCommentPending true on DELETE_COMMENT_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: DELETE_COMMENT_START})
    expect(state.deleteCommentPending).toBe(true)
});

it('should set deleteCommentPending false and commentToDelete null on DELETE_COMMENT_SUCCESS', function () {
    const initialState = {
        deleteCommentPending: true,
        commentToDelete: 'something'
    }
    const state = boardReducer(initialState, {type: DELETE_COMMENT_SUCCESS})
    expect(state.deleteCommentPending).toBe(false)
    expect(state.commentToDelete).toBeNull()
});

it('should set deleteCommentPending false and commentToDelete null on DELETE_COMMENT_FAILURE', function () {
    const initialState = {
        deleteCommentPending: true,
        commentToDelete: 'something'
    }
    const state = boardReducer(initialState, {type: DELETE_COMMENT_FAILURE})
    expect(state.deleteCommentPending).toBe(false)
    expect(state.commentToDelete).toBeNull()
});

it('should set threadToView on VIEW_COMMENTS', function () {
    const thread = {
        id: 4,
        title: 'title',
        date: 'date',
        username: 'user'
    }
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: VIEW_COMMENTS, payload: thread.id})
    expect(state.threadToView).toBe(thread.id)
});

it('should set threadToEdit on EDIT_THREAD', function () {
    const thread = {
        id: 4,
        title: 'title',
        date: 'date',
        username: 'user'
    }
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: EDIT_THREAD, payload: thread})
    expect(state.threadToEdit).toBe(thread)
});

it('should set threadToDelete on DELETE_THREAD', function () {
    const thread = {
        id: 4,
        title: 'title',
        date: 'date',
        username: 'user'
    }
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: DELETE_THREAD, payload: thread})
    expect(state.threadToDelete).toBe(thread)
});

it('should set threadToView and threadComments to null on CANCEL_VIEW_COMMENTS', function () {
    const initialState = {
        boardReducer: {
            threadComments: ['comment1', 'comment2', 'comment3'],
            threadToView: 4
        }
    }
    const state = boardReducer(initialState, {type: CANCEL_VIEW_COMMENTS})
    expect(state.threadToView).toBeNull()
    expect(state.threadComments).toBeNull()
});

it('should set commentToAdd to null on CANCEL_ADD_COMMENT', function () {
    const initialState = {
        boardReducer: {
            commentToAdd: 'comment1'
        }
    }
    const state = boardReducer(initialState, {type: CANCEL_ADD_COMMENT})
    expect(state.commentToAdd).toBeNull()

});

it('should set threadToEdit to null on CANCEL_EDIT_THREAD', function () {
    const initialState = {
        boardReducer: {
            threadToEdit: 'title'
        }
    }
    const state = boardReducer(initialState, {type: CANCEL_EDIT_THREAD})
    expect(state.threadToEdit).toBeNull()
});

it('should set commentToAdd on ADD_COMMENT', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: ADD_COMMENT})
    expect(state.commentToAdd).toStrictEqual({username: '', body: '', date: ''})
});

it('should set addCommentPending true on ADD_COMMENT_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: ADD_COMMENT_START})
    expect(state.addCommentPending).toBe(true)
});

it('should set addCommentPending false on ADD_COMMENT_SUCCESS', function () {
    const initialState = {
        addCommentPending: true
    }
    const state = boardReducer(initialState, {type: ADD_COMMENT_SUCCESS})
    expect(state.addCommentPending).toBe(false)
});

it('should set addCommentPending false on ADD_COMMENT_FAILURE', function () {
    const initialState = {
        addCommentPending: true
    }
    const state = boardReducer(initialState, {type: ADD_COMMENT_FAILURE})
    expect(state.addCommentPending).toBe(false)
});

it('should set deleteThreadPending true on DELETE_THREAD_START', function () {
    const initialState = boardReducer()
    const state = boardReducer(initialState, {type: DELETE_THREAD_START})
    expect(state.deleteThreadPending).toBe(true)
});

it('should set deleteThreadPending false on DELETE_THREAD_SUCCESS', function () {
    const initialState = {
        deleteThreadPending: true,
        threadToDelete: {title: 'thread'}
    }
    const state = boardReducer(initialState, {type: DELETE_THREAD_SUCCESS})
    expect(state.deleteThreadPending).toBe(false)
    expect(state.threadToDelete).toBeNull()
});

it('should set deleteThreadPending false on DELETE_THREAD_FAILURE', function () {
    const initialState = {
        deleteThreadPending: true,
        threadToDelete: {title: 'thread'}
    }
    const state = boardReducer(initialState, {type: DELETE_THREAD_FAILURE})
    expect(state.deleteThreadPending).toBe(false)
    expect(state.threadToDelete).toBeNull()
});


/** FETCH **/

it('should dispatch ADD_THREAD_START then ADD_THREAD_SUCCESS when initiateAddThread', async function () {
    const username = 'user'
    const id = 1
    const title = 'some title'
    const date = 'some date'
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToAdd: {title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }
    }
    const url = `http://localhost:8081/board/createThread?token=${token}&title=${title}&date=${date}&username=${username}&userId=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateAddThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD_SUCCESS})
});

it('should dispatch ADD_THREAD_START then ADD_THREAD_FAILURE when initiateAddThread w/ error', async function () {
    const username = 'user'
    const id = 1
    const title = 'some title'
    const date = 'some date'
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToAdd: {title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }
    }
    const url = `http://localhost:8081/board/createThread?token=${token}&title=${title}&date=${date}&username=${username}&userId=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateAddThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_THREAD_FAILURE})
});

it('should dispatch THREAD_LIST_START then THREAD_LIST_SUCCESS when getThreadList', async function () {
    const list = [
        {title: 'some title', date: '1-1-2001', id: 1},
        {title: 'another title', date: '8-26-1985', id: 2},
        {title: '3rd title', date: '3-3-2003', id: 3}
    ]
    const url = `http://localhost:8081/board/threadList`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(list))
        }))
    }
    const dispatch = jest.fn()
    await getThreadList(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: THREAD_LIST_START})
    expect(dispatch).toHaveBeenCalledWith({type: THREAD_LIST_SUCCESS, payload: list})
});

it('should dispatch THREAD_LIST_START then THREAD_LIST_FAILURE when error', async function () {
    const url = `http://localhost:8081/board/threadList`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await getThreadList(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: THREAD_LIST_START})
    expect(dispatch).toHaveBeenCalledWith({type: THREAD_LIST_FAILURE})
});

it('should dispatch GET_COMMENTS_START then GET_COMMENTS_SUCCESS when getComments', async function () {
    const getState = () => {
        return {
            boardReducer: {
                threadToView: 1
            }
        }
    }
    const list = [
        {username: 'user', date: 'date', body: 'body'},
        {username: 'user2', date: 'date2', body: 'body2'},
        {username: 'user3', date: 'date3', body: 'body3'}
    ]
    const id = 1
    const url = `http://localhost:8081/board/commentList?id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(list))
        }))
    }
    const dispatch = jest.fn()
    await getComments(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_COMMENTS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_COMMENTS_SUCCESS, payload: list})
});

it('should dispatch GET_COMMENTS_START then GET_COMMENTS_FAILURE when getComments', async function () {
    const getState = () => {
        return {
            boardReducer: {
                threadToView: 1
            }
        }
    }
    const id = 1
    const url = `http://localhost:8081/board/commentList?id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await getComments(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_COMMENTS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_COMMENTS_FAILURE})
});

it('should dispatch ADD_COMMENT_START then ADD_COMMENT_SUCCESS when initiateAddComment', async function () {
    const token = 'some token'
    const username = 'user'
    const userId = 6
    const id = 9
    const body = 'body'
    const date = 'some date'
    const getState = () => {
        return {
            boardReducer: {
                commentToAdd: {body: 'body', date: 'some date'},
                threadToView: id
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 6, token: 'some token'}
            }
        }
    }
    const url = `http://localhost:8081/board/addComment?token=${token}&id=${id}&username=${username}&date=${date}&body=${body}&userId=${userId}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateAddComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_COMMENT_SUCCESS})
});

it('should dispatch ADD_COMMENT_START then ADD_COMMENT_FAILURE when initiateAddComment w/ error', async function () {
    const token = 'some token'
    const username = 'user'
    const userId = 6
    const id = 9
    const body = 'body'
    const date = 'some date'
    const getState = () => {
        return {
            boardReducer: {
                commentToAdd: {body: 'body', date: 'some date'},
                threadToView: id
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 6, token: 'some token'}
            }
        }
    }
    const url = `http://localhost:8081/board/addComment?token=${token}&id=${id}&username=${username}&date=${date}&body=${body}&userId=${userId}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateAddComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_COMMENT_FAILURE})
});

it('should dispatch EDIT_THREAD_START then EDIT_THREAD_SUCCESS when initiateEditThread', async function () {
    const id = 1
    const title = 'some title'
    const date = 'some date'
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToEdit: {
                    id: 1,
                    title: 'some title',
                    date: 'some date',
                    username: 'brady',
                    userId: 4,
                    comments: []
                }
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 6, token: 'some token'}
            }

        }
    }
    const url = `http://localhost:8081/board/editThread?token=${token}&id=${id}&title=${title}&date=${date}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateEditThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD_SUCCESS})
});

it('should dispatch EDIT_THREAD_START then EDIT_THREAD_FAILURE when initiateEditThread w/ error', async function () {
    const id = 1
    const title = 'some title'
    const date = 'some date'
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToEdit: {
                    id: 1,
                    title: 'some title',
                    date: 'some date',
                    username: 'brady',
                    userId: 4,
                    comments: []
                }
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 6, token: 'some token'}
            }

        }
    }
    const url = `http://localhost:8081/board/editThread?token=${token}&id=${id}&title=${title}&date=${date}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false}))
    }
    const dispatch = jest.fn()
    await initiateEditThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_THREAD_FAILURE})
});

it('should dispatch DELETE_THREAD_START then DELETE_THREAD_SUCCESS when initiateDeleteThread', async function () {
    const id = 1
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToDelete: {id: 1, title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/deleteThread?token=${token}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateDeleteThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_THREAD_SUCCESS})
});

it('should dispatch DELETE_THREAD_START then DELETE_THREAD_FAILURE when initiateDeleteThread w/ error', async function () {
    const id = 1
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                threadToDelete: {id: 1, title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/deleteThread?token=${token}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateDeleteThread(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_THREAD_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_THREAD_FAILURE})
});

it('should dispatch DELETE_COMMENT_START then DELETE_COMMENT_SUCCESS when initiateDeleteComment', async function () {
    const id = 1
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                commentToDelete: {id: 1, title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/deleteComment?token=${token}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateDeleteComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_COMMENT_SUCCESS})
});

it('should dispatch DELETE_COMMENT_START then DELETE_COMMENT_FAILURE when initiateDeleteComment w/ error', async function () {
    const id = 1
    const token = 'some token'
    const getState = () => {
        return {
            boardReducer: {
                commentToDelete: {id: 1, title: 'some title', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/deleteComment?token=${token}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateDeleteComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_COMMENT_FAILURE})
});

it('should dispatch EDIT_COMMENT_START then EDIT_COMMENT_SUCCESS when initiateEditComment', async function () {
    const id = 1
    const token = 'some token'
    const body = 'some body'
    const getState = () => {
        return {
            boardReducer: {
                commentToEdit: {id: 1, body: 'some body', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/editComment?token=${token}&id=${id}&body=${body}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateEditComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_COMMENT_SUCCESS})
});

it('should dispatch EDIT_COMMENT_START then EDIT_COMMENT_FAILURE when initiateEditComment w/ error', async function () {
    const id = 1
    const token = 'some token'
    const body = 'some body'
    const getState = () => {
        return {
            boardReducer: {
                commentToEdit: {id: 1, body: 'some body', date: 'some date'}
            },
            userReducer: {
                loggedInUser: {username: 'user', userId: 1, token: 'some token'}
            }
        }}

    const url = `http://localhost:8081/board/editComment?token=${token}&id=${id}&body=${body}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateEditComment(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_COMMENT_START})
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_COMMENT_FAILURE})
});