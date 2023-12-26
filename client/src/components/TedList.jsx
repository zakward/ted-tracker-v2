import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';

function TedList() {
    const {allTeds, addTed} = useContext(UserContext)
    console.log(allTeds)
    const tedElements = allTeds.map(ted => {
        return (
            <>
                <h1>{ted.name}</h1>
                <h1>{ted.category}</h1>
                <h1>{ted.type}</h1>

            </>
        )
    })
    return ( 
        <>
            <h1>Future Ted List</h1>
            {tedElements}
        </>
     );
}

export default TedList;