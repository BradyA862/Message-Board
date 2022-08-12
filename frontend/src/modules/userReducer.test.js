import userReducer, {
    CANCEL_SEND_MESSAGE,
    CANCEL_VIEW_MESSAGES,
    CANCEL_VIEW_USERS,
    DELETE_MESSAGE_FAILURE,
    DELETE_MESSAGE_START,
    DELETE_MESSAGE_SUCCESS,
    getList, getMessageList,
    initiateDeleteMessage,
    initiateLogin,
    initiateRegister,
    LIST_FAILURE,
    LIST_START,
    LIST_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    SEND_MESSAGE,
    UPDATE_CREDENTIALS,
    VIEW_MESSAGES, VIEW_MESSAGES_FAILURE,
    VIEW_MESSAGES_START,
    VIEW_MESSAGES_SUCCESS,
    VIEW_USERS
} from "./userReducer";

/** Initial State **/

it('should start with users empty', function () {
    const state = userReducer()
    expect(state.users.length).toBe(0)
});

it('should start with blank credentials', function () {
    const state = userReducer()
    expect(state.credentials).toStrictEqual({username: '', password: ''})
});

it('should start with isRegister false', function () {
    const state = userReducer()
    expect(state.isRegister).toBe(false)
});

it('should start with loginPending false', function () {
    const state = userReducer()
    expect(state.loginPending).toBe(false)
});

it('should start with registerPending false', function () {
    const state = userReducer()
    expect(state.registerPending).toBe(false)
});

it('should start with deleteUserPending false', function () {
    const state = userReducer()
    expect(state.deleteUserPending).toBe(false)
});

it('should start with loggedInUser null', function () {
    const state = userReducer()
    expect(state.loggedInUser).toBeNull()
});

it('should start with messageToSend null', function () {
    const state = userReducer()
    expect(state.messageToSend).toBeNull()
});

it('should start with listPending false', function () {
    const state = userReducer()
    expect(state.listPending).toBe(false)
});

it('should start with viewingUsers false', function () {
    const state = userReducer()
    expect(state.viewingUsers).toBe(false)
});

it('should start with viewingMessages false', function () {
    const state = userReducer()
    expect(state.viewingMessages).toBe(false)
});

it('should start with sendPending false', function () {
    const state = userReducer()
    expect(state.sendPending).toBe(false)
});

it('should start with deletePending false', function () {
    const state = userReducer()
    expect(state.deletePending).toBe(false)
});

it('should start with messageToDelete null', function () {
    const state = userReducer()
    expect(state.messageToDelete).toBeNull()
});


/** Actions **/

it('should set loginPending true on LOGIN_START', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: LOGIN_START})
    expect(state.loginPending).toBe(true)
});

it('should set loginPending false and loggedInUser on LOGIN_SUCCESS', function () {
    const initialState = {
        users: [
            {id: 1, username: "brady", password: "mypass"}
        ],
        loginPending: true,
        credentials: {username: "brady", password: "mypass"}
    }
    const token = "some token"
    const state = userReducer(initialState, {type: LOGIN_SUCCESS, payload: token})
    expect(state.loginPending).toBe(false)
    expect(state.loggedInUser).toStrictEqual({userId: 1, username: "brady", token: token})
});

it('should set loginPending to false on LOGIN_FAILURE', function () {
    const initialState = {
        loginPending: true
    }
    const state = userReducer(initialState, {type: LOGIN_FAILURE})
    expect(state.loginPending).toBe(false)
});

it('should update creds when UPDATE_CREDENTIALS', function () {
    const initialState = {
        credentials: {
            username: '',
            password: ''
        }
    }
    const updateCreds = {
        username: 'brady',
        password: 'mypass'
    }
    const state = userReducer(initialState, {type: UPDATE_CREDENTIALS, payload: updateCreds})
    expect(state.credentials).toStrictEqual(updateCreds)
});

it('should set isRegister true on REGISTER', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: REGISTER})
    expect(state.isRegister).toBe(true)
});

it('should set registerPending true on REGISTER_START', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: REGISTER_START})
    expect(state.registerPending).toBe(true)
});

it('should set registerPending to false on REGISTER_FAILURE', function () {
    const initialState = {
        registerPending: true
    }
    const state = userReducer(initialState, {type: REGISTER_FAILURE})
    expect(state.registerPending).toBe(false)
});

it('should set registerPending to false on REGISTER_SUCCESS', function () {
    const initialState = {
        registerPending: true
    }
    const state = userReducer(initialState, {type: REGISTER_SUCCESS})
    expect(state.registerPending).toBe(false)
});

it('should set listPending true on LIST_START', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: LIST_START})
    expect(state.listPending).toBe(true)
});

it('should set listPending to false on LIST_FAILURE', function () {
    const initialState = {
        listPending: true
    }
    const state = userReducer(initialState, {type: LIST_FAILURE})
    expect(state.listPending).toBe(false)
});

it('should set listPending to false on LIST_SUCCESS', function () {
    const initialState = {
        listPending: true
    }
    const state = userReducer(initialState, {type: LIST_SUCCESS})
    expect(state.listPending).toBe(false)
});

it('should set loggedInUser to null and credentials to blank on LOGOUT', function () {
    const initialState = {
        loggedInUser: {username: 'brady', token: 'some token'},
        credentials: {username: 'brady', password: 'mypass'}
    }
    const state = userReducer(initialState, {type: LOGOUT})
    expect(state.loggedInUser).toBeNull()
    expect(state.credentials).toStrictEqual({username: '', password: ''})
});

it('should set viewingUsers true on VIEW_USERS', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: VIEW_USERS})
    expect(state.viewingUsers).toBe(true)
});

it('should set viewingUsers false on CANCEL_VIEW_USERS', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: CANCEL_VIEW_USERS})
    expect(state.viewingUsers).toBe(false)
});

it('should set viewingMessages true on VIEW_MESSAGES', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: VIEW_MESSAGES})
    expect(state.viewingMessages).toBe(true)
});

it('should set viewingMessages false on CANCEL_VIEW_MESSAGES', function () {
    const initialState = userReducer()
    const state = userReducer(initialState, {type: CANCEL_VIEW_MESSAGES})
    expect(state.viewingMessages).toBe(false)
});

it('should set messageToSend on SEND_MESSAGE', function () {
    const initialState = {
        userReducer: {
            loggedInUser: {
                username: 'brady',
                token: 'token',
                userId: 4
            }
        }
    }
    const now = new Date()
    const state = userReducer(initialState, {type: SEND_MESSAGE, payload: 8})
    expect(state.messageToSend).toStrictEqual({
        sender: '',
        receiver: 8,
        date: now.toDateString(),
        body: ''
    })
});

it('should set messageToSend null on CANCEL_SEND_MESSAGE', function () {
    const now = new Date()
    const initialState = {
        userReducer: {
            loggedInUser: {
                username: 'brady',
                token: 'token',
                userId: 4
            },
            messageToSend: {
                sender: 'brady',
                receiver: 8,
                date: now.toDateString(),
                body: ''
            }}}

    const state = userReducer(initialState, {type: CANCEL_SEND_MESSAGE})
    expect(state.messageToSend).toBeNull()
});


/** Fetch **/

it('should dispatch LOGIN_START then LOGIN_SUCCESS when initiateLogin w/ good creds', async function () {
    const username = "brady"
    const password = "mypass"
    const token = "some token"
    const getState = () => {
        return {
            userReducer: {
                credentials: {username: "brady", password: "mypass"}
            }
        }
    }
    const url = `http://localhost:8080/user/login?username=${username}&password=${password}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(token))
        }))
    }
    const dispatch = jest.fn()
    await initiateLogin(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN_START})
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN_SUCCESS, payload: token})
});

it('should dispatch LOGIN_START then LOGIN_FAILURE when initiateLogin w/ bad creds', async function () {
    const username = "brady"
    const password = "mypass"
    const getState = () => {
        return {
            userReducer: {
                credentials: {username: "brady", password: "mypass"}
            }
        }
    }
    const url = `http://localhost:8080/user/login?username=${username}&password=${password}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateLogin(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN_START})
    expect(dispatch).toHaveBeenCalledWith({type: LOGIN_FAILURE})
});

it('should dispatch REGISTER_START then REGISTER_SUCCESS when initiateRegister w/ good creds', async function () {
    const username = "brady"
    const password = "mypass"
    const getState = () => {
        return {
            userReducer: {
                credentials: {username: "brady", password: "mypass"}
            }
        }
    }
    const url = `http://localhost:8080/user/register?username=${username}&password=${password}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res())
        }))
    }
    const dispatch = jest.fn()
    await initiateRegister(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_START})
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_SUCCESS})
});

it('should dispatch REGISTER_START then REGISTER_FAILURE when initiateRegister w/ bad creds', async function () {
    const username = "brady"
    const password = "mypass"
    const getState = () => {
        return {
            userReducer: {
                credentials: {username: "brady", password: "mypass"}
            }
        }
    }
    const url = `http://localhost:8080/user/register?username=${username}&password=${password}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await initiateRegister(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_START})
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_FAILURE})
});

it('should dispatch LIST_START then LIST_SUCCESS when getList', async function () {
    const list = [
        {username: 'brady', password: 'mypass', id: 1},
        {username: 'user', password: 'password', id: 2},
        {username: '3', password: '3', id: 3}
    ]
    const url = `http://localhost:8080/user/userList`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(list))
        }))
    }
    const dispatch = jest.fn()
    await getList(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: LIST_START})
    expect(dispatch).toHaveBeenCalledWith({type: LIST_SUCCESS, payload: list})
});

it('should dispatch LIST_START then LIST_FAILURE when error', async function () {
    const url = `http://localhost:8080/user/userList`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await getList(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: LIST_START})
    expect(dispatch).toHaveBeenCalledWith({type: LIST_FAILURE})
});

it('should dispatch DELETE_MESSAGE_START then DELETE_MESSAGE_SUCCESS when initiateDeleteMessage', async function () {
    const token = "some token"
    const id = 4
    const receiver = 9
    const getState = () => {
        return {
            userReducer: {
                loggedInUser: {username: "brady", token: 'some token'},
                messageToDelete: {id: 4, receiver: 9}
            }
        }
    }
    const url = `http://localhost:8080/user/deleteMessage?token=${token}&receiver=${receiver}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(token))
        }))
    }
    const dispatch = jest.fn()
    await initiateDeleteMessage(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_MESSAGE_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_MESSAGE_SUCCESS})
});

it('should dispatch DELETE_MESSAGE_START then DELETE_MESSAGE_FAILURE when initiateDeleteMessage w/ error', async function () {
    const token = "some token"
    const id = 4
    const receiver = 9
    const getState = () => {
        return {
            userReducer: {
                loggedInUser: {username: "brady", token: 'some token'},
                messageToDelete: {id: 4, receiver: 9}}}}
    const url = `http://localhost:8080/user/deleteMessage?token=${token}&receiver=${receiver}&id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))}
    const dispatch = jest.fn()
    await initiateDeleteMessage(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_MESSAGE_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_MESSAGE_FAILURE})
});

it('should dispatch VIEW_MESSAGES_START then VIEW_MESSAGES_SUCCESS when getMessageList', async function () {
    const id = 4
    const getState = () => {
        return {
            userReducer: {
                loggedInUser: {username: "brady", token: 'some token', userId: 4}}}}
    const list = ['message1', 'message2', 'message3']
    const url = `http://localhost:8080/user/messageList?id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(list))
        }))
    }
    const dispatch = jest.fn()
    await getMessageList(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_MESSAGES_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_MESSAGES_SUCCESS, payload: list})
});

it('should dispatch VIEW_MESSAGES_START then VIEW_MESSAGES_FAILURE when getMessageList w/ error', async function () {
    const id = 4
    const getState = () => {
        return {
            userReducer: {
                loggedInUser: {username: "brady", token: 'some token', userId: 4}}}}
    const url = `http://localhost:8080/user/messageList?id=${id}`
    let _url
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false
        }))
    }
    const dispatch = jest.fn()
    await getMessageList(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_MESSAGES_START})
    expect(dispatch).toHaveBeenCalledWith({type: VIEW_MESSAGES_FAILURE})
});