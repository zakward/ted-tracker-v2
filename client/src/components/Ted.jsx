import React, {useContext} from 'react';
import moment from "moment"
import { UserContext } from '../context/UserContext';
import Review from "./Review"


function Ted({name, _id, grower, category,dispensaryPurchased, thc, cbd, type, harvestDate, stars}) {
    const date = moment(harvestDate).format("MM-DD-YYYY")
    const {deleteTed, allReviews} = useContext(UserContext)
    const deleteTedItem = () => {
        console.log("Test")
        deleteTed(_id)
    }
    const filteredReviews = allReviews.filter(review => review.tedId === _id)
    const filteredElements = filteredReviews.map(review => {
        return (
            <>
                <Review {...review}/>
            </>
        )
    })
    return ( 
        <div id = "ted-wrapper">
            <h2>{name}</h2>
            <h4>{grower}</h4>
            <p>Harvest Date: {date}</p>
            <p>Purchased from: {dispensaryPurchased}</p>
            <p>THC: {thc}%</p>
            <p>CBD: {cbd}%</p>
            <p>Category: {category}</p>
            <p>Type: {type}</p>
            <p>Stars: {stars} </p>
            <h3>REVIEWS</h3>
           <div>{filteredElements}</div>
           <button onClick = {deleteTedItem}>Delete TED</button>
        </div>
     );
}

export default Ted;