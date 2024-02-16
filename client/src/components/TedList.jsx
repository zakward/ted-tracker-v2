import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios"
import Ted from './Ted';

function TedList() {
    const { allTeds, setAllTeds, userAxios, allReviews } = useContext(UserContext)
    console.log(allTeds)
    const tedElements = allTeds.map(ted => {
        return (
           <Ted {...ted} key ={ted._id} />
        )
    })



    useEffect(()=> {
        userAxios.get("/api/main/ted/tedWithReviews")
            .then(res => setAllTeds(res.data) )
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <h1 id = "ted-title"style = {{color: "white", fontSize: "46px", borderBottom: "3px dashed white"}}>Ted Tracker</h1>
        <div style = {{display: "flex", flexDirection: "column", gap: "40px", marginTop: "50px"}}>
            {tedElements}
        </div>
        </>
    );
}

export default TedList;