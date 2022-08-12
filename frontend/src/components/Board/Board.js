import {useDispatch, useSelector} from "react-redux";
import AddThread from "./Thread/AddThread";
import ThreadList from "./Thread/ThreadList";
import Header from "../Header";
import ViewThreadComments from "./Comment/ViewThreadComments";
import EditThread from "./Thread/EditThread";
import {useEffect} from "react";
import {getThreadList} from "../../modules/boardReducer";
import EditComment from "./Comment/EditComment";
import AddComment from "./Comment/AddComment";
import {getMessageList} from "../../modules/userReducer";
import MessageList from "../User/user actions/MessageList";
import UserList from "../User/user actions/UserList";
import SendMessage from "../User/user actions/SendMessage";

export default function Board({
                                  _useSelector = useSelector,
                                  _useDispatch = useDispatch,
                                  AddThreadX = AddThread,
                                  ThreadListX = ThreadList,
                                  HeaderX = Header,
                                  ViewThreadCommentsX = ViewThreadComments,
                                  EditThreadX = EditThread,
                                  EditCommentX = EditComment,
                                  AddCommentX = AddComment,
                                  MessageListX = MessageList,
                                  UserListX = UserList,
                                  SendMessageX = SendMessage
                              }) {
    const dispatch = _useDispatch()

    const threadToAdd = _useSelector(state => state.boardReducer.threadToAdd)
    const threadToEdit = _useSelector(state => state.boardReducer.threadToEdit)
    const threadToView = _useSelector(state => state.boardReducer.threadToView)
    const commentToEdit = _useSelector(state => state.boardReducer.commentToEdit)
    const commentToAdd = _useSelector(state => state.boardReducer.commentToAdd)
    const viewingMessages = _useSelector(state => state.userReducer.viewingMessages)
    const viewingUsers = _useSelector(state => state.userReducer.viewingUsers)
    const messageToSend = _useSelector(state => state.userReducer.messageToSend)


    useEffect(() => {
        dispatch(getThreadList())
        dispatch(getMessageList())
    })

    if (threadToAdd) {
        return <div style={{
             left: '50%', top: '20%',
            transform: 'translate(0%, 50%)'
        }}>
            <AddThreadX/>
        </div>


    } else if (threadToEdit) {
        return <div style={{
            left: '50%', top: '20%',
            transform: 'translate(0%, 50%)'
        }}>
            <EditThreadX/>
        </div>

    } else if (threadToView) {

        if (commentToEdit) {
            return <div style={{
                left: '50%', top: '20%',
                transform: 'translate(0%, 50%)'
            }}>
                <EditCommentX/>
            </div>


        } else if (commentToAdd) {
            return <div style={{
                left: '50%', top: '20%',
                transform: 'translate(0%, 50%)'
            }}>
                <AddCommentX/>
            </div>
        }

        return <ViewThreadCommentsX/>


    }  else if (messageToSend) {
        return <div style={{
            left: '50%', top: '20%',
            transform: 'translate(0%, 50%)'
        }}>
            <SendMessageX/>
        </div>


    }  else if (viewingUsers) {
            return <UserListX/>
        }


    else if (viewingMessages) {
        return <MessageListX/>


    } else {
        return <div>
            <HeaderX/>
            <ThreadListX/>
        </div>
    }
    // if (threadToEdit) {
    //     return
    // }
}