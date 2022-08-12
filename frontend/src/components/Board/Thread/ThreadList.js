import {useSelector} from "react-redux";
import StaticThread from "./StaticThread";



export default function ThreadList({
                                       _useSelector = useSelector,
                                       StaticThreadX = StaticThread,
                                   }) {


    const threads = _useSelector(state => state.boardReducer.threads)

    return <div>
        <div>
            {threads.map(
                (staticThread, index) => <div key={index}>
                    <StaticThreadX staticThread={staticThread}/>
                </div>
            )}
        </div>
    </div>



}