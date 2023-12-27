import React, {useContext} from 'react';
import moment from "moment"
import { UserContext } from '../context/UserContext';


function Ted({name, _id, grower, category,dispensaryPurchased, thc, cbd, type, harvestDate, stars}) {
    const date = moment(harvestDate).format("MM-DD-YYYY")
    const {deleteTed} = useContext(UserContext)
    const deleteTedItem = () => {
        console.log("Test")
        deleteTed(_id)
    }
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
            <button onClick = {deleteTedItem}>X</button>
        </div>
     );
}

export default Ted;