import {useDispatch, useSelector} from "react-redux";
import StaticUser from "../StaticUser";
import {Button} from "react-bootstrap";
import {CANCEL_VIEW_USERS} from "../../../modules/userReducer";

export default function UserList({
                                     _useSelector = useSelector,
                                     _useDispatch = useDispatch,
                                     StaticUserX = StaticUser
}) {
    const dispatch = _useDispatch()

    const users = _useSelector(state => state.userReducer.users)

    function handleCancel() {
        dispatch({type: CANCEL_VIEW_USERS})
    }

    return <div>
        {users.map(
            (staticUser, index) => <div key={index}>
                <StaticUserX staticUser={staticUser}/>
            </div>
        )}
        <Button onClick={handleCancel} style={{backgroundColor: '#FFC300', color: 'black', outlineColor: '#FFC300'}}>Back</Button>
    </div>
}