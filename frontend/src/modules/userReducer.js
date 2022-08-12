export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const REGISTER = 'REGISTER'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const CANCEL_REGISTER = 'CANCEL_REGISTER'
export const LIST_START = 'LIST_START'
export const LIST_SUCCESS = 'LIST_SUCCESS'
export const LIST_FAILURE = 'LIST_FAILURE'
export const LOGOUT = 'LOGOUT'
export const VIEW_USERS = 'VIEW_USERS'
export const VIEW_MESSAGES = 'VIEW_MESSAGES'
export const CANCEL_VIEW_USERS = 'CANCEL_VIEW_USERS'
export const CANCEL_VIEW_MESSAGES = 'CANCEL_VIEW_MESSAGES'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const CANCEL_SEND_MESSAGE = 'CANCEL_SEND_MESSAGE'
export const UPDATE_BODY = 'UPDATE_BODY'
export const SEND_MESSAGE_START = 'SEND_MESSAGE_START'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const DELETE_MESSAGE_START = 'DELETE_MESSAGE_START'
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS'
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE'
export const VIEW_MESSAGES_START = 'VIEW_MESSAGES_START'
export const VIEW_MESSAGES_SUCCESS = 'VIEW_MESSAGES_SUCCESS'
export const VIEW_MESSAGES_FAILURE = 'VIEW_MESSAGES_FAILURE'
export const SET_RECEIVER = 'SET_RECEIVER'

const initialState = {
    users: [],
    messages: [],
    credentials: {username: '', password: ''},
    isRegister: false,
    loginPending: false,
    registerPending: false,
    loggedInUser: null,
    deleteUserPending: false,
    listPending: false,
    viewingUsers: false,
    viewingMessages: false,
    messageToSend: null,
    sendPending: false,
    messageToDelete: null,
    deletePending: false,
    getMessagesPending: false,
    messageUsers: null
}

export default function userReducer(state = initialState, action) {

    switch (action?.type) {

        case LOGIN_START:
            return {
                ...state,
                loginPending: true,
            }

        case LOGIN_SUCCESS:
            const foundUser = state.users.find(element => element.username === state.credentials.username
            && element.password === state.credentials.password)
            console.log(foundUser)
            return {
                ...state,
                loginPending: false,
                loggedInUser: {
                    userId: foundUser.id,
                    username: state.credentials.username,
                    token: action.payload
                }
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false
            }

        case LOGOUT:
            return {
                ...state,
                loggedInUser: null,
                credentials: {username: '', password: ''}
            }

        case UPDATE_CREDENTIALS:
            return {
                ...state,
                credentials: {
                    username: action.payload.username,
                    password: action.payload.password
                }
            }

        case REGISTER:
            return {
                ...state,
                isRegister: true
            }

        case REGISTER_START:
            return {
                ...state,
                registerPending: true
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                registerPending: false
            }

        case REGISTER_FAILURE:
            return {
                ...state,
                registerPending: false,
                isRegister: false
            }

        case CANCEL_REGISTER:
            return {
                ...state,
                isRegister: false
            }

        case LIST_START:
            return {
                ...state,
                listPending: true
            }

        case LIST_SUCCESS:
            return {
                ...state,
                listPending: false,
                users: action.payload
            }

        case LIST_FAILURE:
            return {
                ...state,
                listPending: false
            }

        case VIEW_USERS:
            return {
                ...state,
                viewingUsers: true
            }

        case VIEW_MESSAGES:
            return {
                ...state,
                viewingMessages: true
            }

        case CANCEL_VIEW_USERS:
            return {
                ...state,
                viewingUsers: false
            }

        case CANCEL_VIEW_MESSAGES:
            return {
                ...state,
                viewingMessages: false
            }

        case VIEW_MESSAGES_START:
            return {
                ...state,
                getMessagesPending: true
            }

        case VIEW_MESSAGES_SUCCESS:
            return {
                ...state,
                getMessagesPending: false,
                messages: action.payload
            }

        case VIEW_MESSAGES_FAILURE:
            return {
                ...state,
                getMessagesPending: false
            }

        case SEND_MESSAGE:
            return {
                ...state,
                messageToSend: {
                    date: '',
                    body: ''
                },
                viewingUsers: false
            }

        case SET_RECEIVER:
            return {
                ...state,
                messageUsers: {
                    sender: state.loggedInUser.userId,
                    receiver: action.payload
                }
            }

        case UPDATE_BODY:
            const now = new Date()
            return {
                ...state,
                messageToSend: {
                    date: now.toDateString(),
                    body: action.payload.body
                }
            }

        case CANCEL_SEND_MESSAGE:
            return {
                ...state,
                messageToSend: null
            }

        case SEND_MESSAGE_START:
            return {
                ...state,
                sendPending: true
            }

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sendPending: false
            }

        case SEND_MESSAGE_FAILURE:
            return {
                ...state,
                sendPending: false
            }

        case DELETE_MESSAGE:
            return {
                ...state,
                messageToDelete: action.payload
            }

        case DELETE_MESSAGE_START:
            return {
                ...state,
                deletePending: true
            }

        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                deletePending: false,
                messageToDelete: null
            }

        case DELETE_MESSAGE_FAILURE:
            return {
                ...state,
                deletePending: false,
                messageToDelete: null
            }

        default:
            return {
                ...state
            }
    }
}

export function initiateLogin(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: LOGIN_START})
        const {username, password} = getState().userReducer.credentials
        const url = `http://localhost:8080/user/login?username=${username}&password=${password}`
        const response = await _fetch(url)
        if (response.ok) {
            const token = await response.json()
            dispatch({type: LOGIN_SUCCESS, payload: token})
        } else {
            dispatch({type: LOGIN_FAILURE})
        }
    }
}

export function initiateRegister(_fetch = fetch) {
    return async function registerSideEffect(dispatch, getState) {
        dispatch({type: REGISTER_START})
        const {username, password} = getState().userReducer.credentials
        const url = `http://localhost:8080/user/register?username=${username}&password=${password}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: REGISTER_SUCCESS})
        } else {
            dispatch({type: REGISTER_FAILURE})
        }
    }
}

export function getList(_fetch = fetch) {
    return async function listSideEffect(dispatch) {
        dispatch({type: LIST_START})
        const url = `http://localhost:8080/user/userList`
        const response = await _fetch(url)
        if (response.ok) {
            const list = await response.json()
            dispatch({type: LIST_SUCCESS, payload: list})
        } else
            dispatch({type: LIST_FAILURE})
    }
}

export function initiateSendMessage(_fetch = fetch) {
    return async function sendMessageSideEffect(dispatch, getState) {
        dispatch({type: SEND_MESSAGE_START})
        const token = getState().userReducer.loggedInUser.token
        const sender = getState().userReducer.messageUsers.sender
        const receiver = getState().userReducer.messageUsers.receiver
        const date = getState().userReducer.messageToSend.date
        const body = getState().userReducer.messageToSend.body
        const url = `http://localhost:8080/user/sendMessage?token=${token}&sender=${sender}&receiver=${receiver}&date=${date}&body=${body}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: SEND_MESSAGE_SUCCESS})
        } else {
            dispatch({type: SEND_MESSAGE_FAILURE})
        }
    }
}

export function initiateDeleteMessage(_fetch = fetch) {
    return async function deleteMessageSE(dispatch, getState) {
        dispatch({type: DELETE_MESSAGE_START})
        const token = getState().userReducer.loggedInUser.token
        const id = getState().userReducer.messageToDelete.id
        const receiver = getState().userReducer.messageToDelete.receiver
        const url = `http://localhost:8080/user/deleteMessage?token=${token}&receiver=${receiver}&id=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: DELETE_MESSAGE_SUCCESS})
        } else {
            dispatch({type: DELETE_MESSAGE_FAILURE})
        }
    }
}

export function getMessageList(_fetch = fetch) {
    return async function messageListSideEffect(dispatch, getState) {
        const id = getState().userReducer.loggedInUser.userId
        dispatch({type: VIEW_MESSAGES_START})
        const url = `http://localhost:8080/user/messageList?id=${id}`
        const response = await _fetch(url)
        if (response.ok) {
            const list = await response.json()
            dispatch({type: VIEW_MESSAGES_SUCCESS, payload: list})
        } else
            dispatch({type: VIEW_MESSAGES_FAILURE})
    }
}

