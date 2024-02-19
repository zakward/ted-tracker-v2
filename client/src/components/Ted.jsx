import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from "moment"
import { UserContext } from '../context/UserContext';
import Review from "./Review"



function Ted({ name, _id, grower, category, dispensaryPurchased, thc, cbd, type, harvestDate, stars }) {

    const { tedId } = useParams()
    const navigate = useNavigate()

    const handleDetailClick = (tedId) => {
        navigate(`/tedList/${tedId}`)
    }

    return (
        <div className =  {`ted-wrapper single-div ${type === "indica" ? "indica-class" : type === "sativa" ? "sativa-class" : "hybrid-class" }`}onClick = {() => handleDetailClick(_id)}>
            <h2>{name}</h2>
        </div>
    );
}

export default Ted;