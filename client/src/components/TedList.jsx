import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function TedList() {
    const { allTeds, addTed } = useContext(UserContext)
    console.log(allTeds)
    const tedElements = allTeds.map(ted => {
        return (
            <>
                <li>{ted.name}</li>
                <li>{ted.category}</li>
                <li>{ted.type}</li>

            </>
        )
    })
    return (
        <>
            <h1>TedList</h1>
            <ul>
                {tedElements}
            </ul>
        </>
    );
}

export default TedList;