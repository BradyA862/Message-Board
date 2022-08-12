export const ADD_THREAD_START = 'ADD_THREAD_START'
export const ADD_THREAD_SUCCESS = 'ADD_THREAD_SUCCESS'
export const ADD_THREAD_FAILURE = 'ADD_THREAD_FAILURE'
export const THREAD_LIST_START = 'THREAD_LIST_START'
export const THREAD_LIST_SUCCESS = 'THREAD_LIST_SUCCESS'
export const THREAD_LIST_FAILURE = 'THREAD_LIST_FAILURE'
export const UPDATE_THREAD = 'UPDATE_THREAD'
export const CANCEL_ADD_THREAD = 'CANCEL_ADD_THREAD'
export const ADD_THREAD = 'ADD_THREAD'
export const VIEW_COMMENTS = 'VIEW_COMMENTS'
export const GET_COMMENTS_START = 'GET_COMMENTS_START'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE'
export const CANCEL_VIEW_COMMENTS = 'CANCEL_VIEW_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT_START = 'ADD_COMMENT_START'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'
export const DELETE_THREAD_START = 'DELETE_THREAD_START'
export const DELETE_THREAD_SUCCESS = 'DELETE_THREAD_SUCCESS'
export const DELETE_THREAD_FAILURE = 'DELETE_THREAD_FAILURE'
export const EDIT_THREAD = 'EDIT_THREAD'
export const DELETE_THREAD = 'DELETE_THREAD'
export const EDIT_THREAD_START = 'EDIT_THREAD_START'
export const EDIT_THREAD_SUCCESS = 'EDIT_THREAD_SUCCESS'
export const EDIT_THREAD_FAILURE = 'EDIT_THREAD_FAILURE'
export const CANCEL_EDIT_THREAD = 'CANCEL_EDIT_THREAD'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT_START = 'EDIT_COMMENT_START'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE'
export const CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT'
export const DELETE_COMMENT_START = 'DELETE_COMMENT_START'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'
export const CANCEL_ADD_COMMENT = 'CANCEL_ADD_COMMENT'
// export const  = ''

const initialState = {
    threads: [],
    threadComments: [],
    addThreadPending: false,
    threadToAdd: null,
    threadToEdit: null,
    threadListPending: false,
    threadToView: null,
    commentsPending: false,
    commentToAdd: null,
    addCommentPending: false,
    threadToDelete: null,
    editThreadPending: false,
    deleteThreadPending: false,
    commentToEdit: null,
    commentToDelete: null,
    deleteCommentPending: false,
    editCommentPending: false
}

export default function boardReducer(state = initialState, action) {

    switch (action?.type) {

        case ADD_THREAD:
            return {
                ...state,
                threadToAdd: {
                    title: '',
                    date: ''
                }
            }

        case ADD_THREAD_START:
            return {
                ...state,
                addThreadPending: true
            }

        case ADD_THREAD_SUCCESS:
            return {
                ...state,
                addThreadPending: false
            }

        case ADD_THREAD_FAILURE:
            return {
                ...state,
                addThreadPending: false
            }

        case CANCEL_ADD_THREAD:
            return {
                ...state,
                threadToAdd: null
            }

        case UPDATE_THREAD:
            const event = new Date()
            return {
                ...state,
                threadToAdd: {
                    title: action.payload.title,
                    date: event.toDateString(),
                }
            }

        case THREAD_LIST_START:
            return {
                ...state,
                listPending: true
            }

        case THREAD_LIST_SUCCESS:
            return {
                ...state,
                listPending: false,
                threads: action.payload
            }

        case THREAD_LIST_FAILURE:
            return {
                ...state,
                listPending: false
            }

        case VIEW_COMMENTS:
            return {
                ...state,
                threadToView: action.payload
            }

        case GET_COMMENTS_START:
            return {
                ...state,
                commentsPending: true
            }

        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                commentsPending: false,
                threadComments: action.payload
            }

        case GET_COMMENTS_FAILURE:
            return {
                ...state,
                commentsPending: false
            }

        case CANCEL_VIEW_COMMENTS:
            return {
                ...state,
                threadComments: null,
                threadToView: null
            }

        case ADD_COMMENT:
            return {
                ...state,
                commentToAdd: {username: '', body: '', date: ''}
            }

        case UPDATE_COMMENT:
            const date = new Date()
            return {
                ...state,
                commentToAdd: {
                    body: action.payload.body,
                    date: date.toDateString(),
                }
            }

        case ADD_COMMENT_START:
            return {
                ...state,
                addCommentPending: true
            }

        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentPending: false,
                commentToAdd: null
            }

        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentPending: false
            }

        case EDIT_THREAD:
            return {
                ...state,
                threadToEdit: action.payload
            }

        case EDIT_THREAD_START:
            return {
                ...state,
                editThreadPending: true
            }

        case EDIT_THREAD_SUCCESS:
            return {
                ...state,
                editThreadPending: false
            }

        case EDIT_THREAD_FAILURE:
            return {
                ...state,
                editThreadPending: false
            }

        case CANCEL_EDIT_THREAD:
            return {
                ...state,
                threadToEdit: null
            }

        case DELETE_THREAD:
            return {
                ...state,
                threadToDelete: action.payload
            }

        case DELETE_THREAD_START:
            return {
                ...state,
                deleteThreadPending: true
            }

        case DELETE_THREAD_SUCCESS:
            return {
                ...state,
                deleteThreadPending: false,
                threadToDelete: null
            }

        case DELETE_THREAD_FAILURE:
            return {
                ...state,
                deleteThreadPending: false,
                threadToDelete: null
            }

        case EDIT_COMMENT:
            return {
                ...state,
                commentToEdit: action.payload
            }

        case EDIT_COMMENT_START:
            return {
                ...state,
                editCommentPending: true
            }

        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                editCommentPending: false
            }

        case EDIT_COMMENT_FAILURE:
            return {
                ...state,
                editCommentPending: false
            }

        case CANCEL_EDIT_COMMENT:
            return {
                ...state,
                commentToEdit: null
            }

        case DELETE_COMMENT:
            return {
                ...state,
                commentToDelete: action.payload
            }

        case DELETE_COMMENT_START:
            return {
                ...state,
                deleteCommentPending: true
            }

        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                deleteCommentPending: false,
                commentToDelete: null
            }

        case DELETE_COMMENT_FAILURE:
            return {
                ...state,
                deleteCommentPending: false,
                commentToDelete: null
            }

        case CANCEL_ADD_COMMENT:
            return {
                ...state,
                commentToAdd: null
            }

        default:
            return {
                ...state
            }
    }
}

export function initiateAddThread(_fetch = fetch) {
    return async function addThreadSE(dispatch, getState) {
        dispatch({type: ADD_THREAD_START})
        const token = getState().userReducer.loggedInUser.token
        const {title, date} = getState().boardReducer.threadToAdd
        const username = getState().userReducer.loggedInUser.username
        const id = getState().userReducer.loggedInUser.userId
        const url = `http://localhost:8081/board/createThread?token=${token}&title=${title}&date=${date}&username=${username}&userId=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: ADD_THREAD_SUCCESS})
        } else {
            dispatch({type: ADD_THREAD_FAILURE})
        }
    }
}

export function getThreadList(_fetch = fetch) {
    return async function listSideEffect(dispatch) {
        dispatch({type: THREAD_LIST_START})
        const url = `http://localhost:8081/board/threadList`
        const response = await _fetch(url)
        if (response.ok) {
            const list = await response.json()
            dispatch({type: THREAD_LIST_SUCCESS, payload: list})
        } else
            dispatch({type: THREAD_LIST_FAILURE})
    }
}

export function getComments(_fetch = fetch) {
    return async function commentsSideEffect(dispatch, getState) {
        dispatch({type: GET_COMMENTS_START})
        const id = getState().boardReducer.threadToView
        const url = `http://localhost:8081/board/commentList?id=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            const list = await response.json()
            dispatch({type: GET_COMMENTS_SUCCESS, payload: list})
        } else
            dispatch({type: GET_COMMENTS_FAILURE})
    }
}

export function initiateAddComment(_fetch = fetch) {
    return async function addCommentSE(dispatch, getState) {
        dispatch({type: ADD_COMMENT_START})
        const token = getState().userReducer.loggedInUser.token
        const username = getState().userReducer.loggedInUser.username
        const userId = getState().userReducer.loggedInUser.userId
        const id = getState().boardReducer.threadToView
        const body = getState().boardReducer.commentToAdd.body
        const date = getState().boardReducer.commentToAdd.date
        const url = `http://localhost:8081/board/addComment?token=${token}&id=${id}&username=${username}&date=${date}&body=${body}&userId=${userId}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: ADD_COMMENT_SUCCESS})
        } else {
            dispatch({type: ADD_COMMENT_FAILURE})
        }
    }
}

export function initiateEditThread(_fetch = fetch) {
    return async function editThreadSE(dispatch, getState) {
        dispatch({type: EDIT_THREAD_START})
        const token = getState().userReducer.loggedInUser.token
        const id = getState().boardReducer.threadToEdit.id
        const title = getState().boardReducer.threadToEdit.title
        const date = getState().boardReducer.threadToEdit.date
        const url = `http://localhost:8081/board/editThread?token=${token}&id=${id}&title=${title}&date=${date}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: EDIT_THREAD_SUCCESS})
        } else {
            dispatch({type: EDIT_THREAD_FAILURE})
        }
    }
}

export function initiateDeleteThread(_fetch = fetch) {
    return async function deleteThreadSE(dispatch, getState) {
        dispatch({type: DELETE_THREAD_START})
        const token = getState().userReducer.loggedInUser.token
        const id = getState().boardReducer.threadToDelete.id
        const url = `http://localhost:8081/board/deleteThread?token=${token}&id=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: DELETE_THREAD_SUCCESS})
        } else {
            dispatch({type: DELETE_THREAD_FAILURE})
        }
    }
}

export function initiateEditComment(_fetch = fetch) {
    return async function editCommentSE(dispatch, getState) {
        dispatch({type: EDIT_COMMENT_START})
        const token = getState().userReducer.loggedInUser.token
        const id = getState().boardReducer.commentToEdit.id
        const body = getState().boardReducer.commentToEdit.body
        const url = `http://localhost:8081/board/editComment?token=${token}&id=${id}&body=${body}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: EDIT_COMMENT_SUCCESS})
        } else {
            dispatch({type: EDIT_COMMENT_FAILURE})
        }
    }
}

export function initiateDeleteComment(_fetch = fetch) {
    return async function deleteCommentSE(dispatch, getState) {
        dispatch({type: DELETE_COMMENT_START})
        const token = getState().userReducer.loggedInUser.token
        const id = getState().boardReducer.commentToDelete.id
        const url = `http://localhost:8081/board/deleteComment?token=${token}&id=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: DELETE_COMMENT_SUCCESS})
        } else {
            dispatch({type: DELETE_COMMENT_FAILURE})
        }
    }
}
