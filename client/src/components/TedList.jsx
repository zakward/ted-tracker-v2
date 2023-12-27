import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios"
import Ted from './Ted';

function TedList() {
    const { allTeds, setAllTeds, userAxios } = useContext(UserContext)
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
        <div id = "ted-list-container">
            {tedElements}
        </div>
    );
}

export default TedList;