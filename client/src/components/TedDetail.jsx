import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import Review from "./Review"


function TedDetail() {

    const { deleteTed, allReviews, allTeds } = useContext(UserContext)
    const {tedId} = useParams()

    const foundTed = allTeds.find((ted)=> ted._id === tedId)

    console.log(allTeds)

    const deleteTedItem = () => {
        deleteTed(tedId)
    }
    const filteredReviews = allReviews.filter(review => review.tedId === tedId)
    const filteredElements = filteredReviews.map(review => {
        return (
            <>
                <Review {...review} />
            </>
        )
    })

    return ( 
    <>
    <div id = "ted-wrapper">
            <h2>{foundTed.name}</h2>
            <h4>{foundTed.grower}</h4>
            <p>Harvest Date: {foundTed.date}</p>
            <p>Purchased from: {foundTed.dispensaryPurchased}</p>
            <p>THC: {foundTed.thc}%</p>
            <p>CBD: {foundTed.cbd}%</p>
            <p>Category: {foundTed.category}</p>
            <p>Type: {foundTed.type}</p>
            <p>Stars: {foundTed.stars} </p>
            <h3>REVIEWS</h3>
           <div>{filteredElements}</div>
           <button onClick = {deleteTedItem}>Delete TED</button>
        </div>
    
    </> );
}

export default TedDetail

