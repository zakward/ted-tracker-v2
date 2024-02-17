import React, {useState, useContext} from 'react';
import {UserContext} from "../context/UserContext";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Review({_id, text, author, setAllReviews}) {

    const {userAxios, user} = useContext(UserContext)

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
           <p>{text}</p>
           {author._id === user._id && <DeleteForeverIcon fontSize = "small" onClick = {handleDeleteReview} id ="delete-review"/>}
          </div>
      


        </>
     );
}

export default Review;