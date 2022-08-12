import StaticMessage from "../StaticMessage";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {CANCEL_VIEW_MESSAGES} from "../../../modules/userReducer";

export default function MessageList({
                                        StaticMessageX = StaticMessage,
                                        _useSelector = useSelector,
                                        _useDispatch = useDispatch
}) {
    const dispatch = _useDispatch()

    const userList = _useSelector(state => state.userReducer.users)
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser.userId)
    const foundUser = userList.find(element => element.userId = loggedInUser)
    const messages = foundUser.messages

    function handleBack() {
        dispatch({type: CANCEL_VIEW_MESSAGES})
    }

    return <div>
        {messages.map(
            (staticMessage, index) => <div key={index}>
                <StaticMessageX staticMessage={staticMessage}/>
            </div>
        )}
        <Button onClick={handleBack} style={{backgroundColor: '#FFC300', color: 'black', outlineColor: '#FFC300'}}>Back</Button>
    </div>
}