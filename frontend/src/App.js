import {useDispatch, useSelector} from "react-redux";
import Board from "./components/Board/Board";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import {getList} from "./modules/userReducer";
import {useEffect} from "react";
import UserList from "./components/User/user actions/UserList";
import MessageList from "./components/User/user actions/MessageList";
import {getThreadList} from "./modules/boardReducer";


function App({
                 _useSelector = useSelector,
                 BoardX = Board,
                 RegisterX = Register,
                 LoginX = Login,
                 _useDispatch = useDispatch,
                 UserListX = UserList,
                 MessageListX = MessageList

             }) {
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)
    const isRegister = _useSelector(state => state.userReducer.isRegister)
    const viewingMessages = _useSelector(state => state.userReducer.viewingMessages)
    const viewingUsers = _useSelector(state => state.userReducer.viewingUsers)

    const dispatch = _useDispatch()

    useEffect(() => {
        dispatch(getList())
        dispatch(getThreadList())
    });

    if (loggedInUser) {
        if (viewingUsers) {
            return <UserListX/>
        }
        if (viewingMessages) {
            return <>
                <MessageListX/>
                </>
        }
        return <>
            <BoardX/>
        </>
    } else if (isRegister) {
        return<div style={{
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -50%)'
        }}>
            <RegisterX/>
        </div>
    } else {
        return <div style={{
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -50%)'
        }}>
            <LoginX/>
        </div>
    }
}

export default App;
