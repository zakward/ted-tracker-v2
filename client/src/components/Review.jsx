import React, {useState, useContext} from 'react';
import {UserContext} from "../context/UserContext";

function Review({_id, text, author, setAllReviews}) {

    const {userAxios} = useContext(UserContext)

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
           <button onClick = {handleDeleteReview}>X</button>
          </div>
      


        </>
     );
}

export default Review;