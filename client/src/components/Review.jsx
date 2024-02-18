import React, {useState, useContext} from 'react';
import {UserContext} from "../context/UserContext";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from "moment"

function Review({_id, text, author, rating, date, setAllReviews}) {

    const {userAxios, user} = useContext(UserContext)

    const postedDate = moment(date)
    const timeAgo = postedDate.fromNow()

    function handleDeleteReview(){
        userAxios.delete(`/api/main/reviews/${_id}`)
        .then(res => setAllReviews(prevReviews => {
            return prevReviews.filter(review => review._id !== _id);
        }
            
        ))
        .catch(err => console.log(err))
    }

    return ( 
        <>
            <div key={_id} className="comment">
         
            <p><strong>{author.username}</strong>:</p>
            <p style = {{fontSize: "small"}}>{timeAgo}</p>
            <Stack spacing={1}>
          <Rating name="half-rating" value={rating} precision={0.5} readOnly size = "small"/>
          {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
        </Stack>
           <p>{text}</p>
           {author._id === user._id && <DeleteForeverIcon fontSize = "small" onClick = {handleDeleteReview} id ="delete-review"/>}
          </div>
      


        </>
     );
}

export default Review;